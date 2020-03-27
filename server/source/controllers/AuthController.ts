import { Request, Response, NextFunction } from 'express'
import ResManager, { ResInfo } from '../util/ResManager'
import { User, UserModel } from '../models/User'
import Joi, { Err } from 'joi'
import bcrypt from 'bcrypt'
import uuidv1 from 'uuid/v1'
import { UserActivationUUID, UserActivationUUIDModel } from '../models/UserActivationUUID'
import pug from 'pug'
import MailService from '../util/MailService'
import path from 'path'
import jwt from 'jsonwebtoken'
import AuthActions from '../actions/AuthActions'

const userModel = new UserModel()

export default class AuthController {
	/**
	 * @desc        Login user
	 * @route       POST /api/auth/register
	 * @access      Public
	 */

	public async register(req: Request, res: Response, next: NextFunction): Promise<Response> {
		// Validate
		let err = userModel.validate(req.body)
		if (err) return res.status(400).json(ResManager.error(err.message))
		// Hash password
		req.body.password = await bcrypt.hash(req.body.password, String(process.env.ENCRYPTION_SALT))
		// Insert to db
		let user = await userModel.create(req.body)
		if (userModel.isInstance(user)) {
			const uuid = uuidv1()
			const userActivationUUID: UserActivationUUID = {
				userId: user.id,
				uuid: uuid,
			}
			const userActivationUUIDModel = new UserActivationUUIDModel()
			await userActivationUUIDModel.create(userActivationUUID)

			const letter = pug.renderFile(path.resolve('public/letters/AccountCreated.pug'), {
				name: user.firstName + user.lastName,
				link: process.env.APP_SERVER + '/verify/' + user.id + '/' + uuid,
				imgSrc: process.env.APP_SERVER + '/images/dating.jpg',
			})
			let mail = await MailService.sendMail(user.email, 'registration', letter)

			return res.status(201).json(ResManager.success(user))
		} else {
			return res.status(422).json(ResManager.error(user.message))
		}
	}

	/**
	 * @desc        Login user
	 * @route       POST /api/auth/login
	 * @access      Public
	 */

	public async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const password = await bcrypt.hash(req.body.password, String(process.env.ENCRYPTION_SALT))
		const user = await AuthActions.validateUserLoginData(req.body.username, password)

		if (user instanceof ResInfo) {
			return res.status(user.code).json(user.resBody)
		}
		await AuthActions.removeCurrentSession(user.id)
		const session = await AuthActions.createNewSession(user.id)
		if (session instanceof ResInfo) {
			return res.status(session.code).json(session.resBody)
		}
		AuthActions.setSessionCookies(res, user.id, session)
		return res.status(200).json(ResManager.success(user))
	}

	/**
	 * @desc        Log user out / clear cookie
	 * @route       POST /api/auth/logout
	 * @access      Private
	 */

	public async logout(req: Request, res: Response, next: NextFunction): Promise<Response> {
		AuthActions.clearSessionCookies(res)
		return res.json(ResManager.success({}))
	}

	/**
	 * @desc        Get current logged in user
	 * @route       POST /api/auth/me
	 * @access      Private
	 */

	public async getMe(req: Request, res: Response, next: NextFunction): Promise<Response> {
		return res.json('Get me')
	}

	/**
	 * @desc        Verify user
	 * @route       POST /api/auth/verify/:id/:uuid
	 * @access      Public
	 */

	public async verify(req: Request, res: Response, next: NextFunction): Promise<Response> {
		let userActivationUUIDModel = new UserActivationUUIDModel()
		const userId = Number(req.params.id)
		const user = await userModel.getOne(userId)

		const userActivationUUID = await userActivationUUIDModel.getOne(userId)

		console.log(userId, user)
		if (userActivationUUIDModel.isInstance(userActivationUUID) && userModel.isInstance(user)) {
			if (userActivationUUID.userId == userId && userActivationUUID.uuid == req.params.uuid) {
				await userModel.updateWhere({ id: userId }, { isVerified: true })
				await userActivationUUIDModel.delete({ userId: userActivationUUID.userId })
				return res.status(200).json(ResManager.success({}))
			}
		}
		return res.status(410).json(ResManager.error('Page no more available'))
	}
}
