import { Request, Response, NextFunction } from 'express'
import ResTemplate from './ResTemplate'
import { User, UserModel } from '../models/User'
import Joi, { Err } from 'joi'
import bcrypt from 'bcrypt'
import uuidv1 from 'uuid/v1'
import { UserActivationUUID, UserActivationUUIDModel } from '../models/UserActivationUUID'
import { UserSession, UserSessionModel } from '../models/UserSession'
import pug from 'pug'
import MailService from '../util/MailService'
import path from 'path'
import jwt from 'jsonwebtoken'

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
		if (err) return res.status(400).json(ResTemplate.error(err.message))
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
			console.log(mail)
			const options = {
				expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
				httpOnly: true,
			}

			const token = jwt.sign({ id: user.id }, uuid)
			return res
				.cookie('token', token, options)
				.status(201)
				.json(ResTemplate.success(user))
		} else {
			return res.status(422).json(ResTemplate.error(user.message))
		}
	}

	/**
	 * @desc        Login user
	 * @route       POST /api/auth/login
	 * @access      Public
	 */

	public async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const user = await userModel.getOneWith('username', req.body.username)
		const password = await bcrypt.hash(req.body.password, String(process.env.ENCRYPTION_SALT))

		if (!userModel.isInstance(user) || user.password != password)
			return res.status(422).json(ResTemplate.error('Incorrect username or password'))

		if (!user.isVerified)
			return res
				.status(403)
				.json(ResTemplate.error('User is not verified. Check your email for verification link.'))

		let session = null
		try {
			session = await AuthController.createNewSession(user)
		} catch {
			return res.status(500).json(ResTemplate.error('Something went wrong'))
		}

		if (session) {
			const options = {
				expires: session.expire,
				httpOnly: true,
				sameSite: true,
			}
			const token = jwt.sign({ id: user.id, session: session.uuid }, session.uuid, {
				expiresIn: Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60,
			})
			return res.cookie('jwt', token, options).json(ResTemplate.success(user))
		} else {
			return res.status(500).json(ResTemplate.error('Cannot set session cookies'))
		}
	}

	private static async createNewSession(user: User): Promise<UserSession | null> {
		console.log('create session func')
		const userSessionModel = new UserSessionModel()
		await userSessionModel.delete({ userId: user.id })
		const uuid = uuidv1()
		const expire = new Date(
			Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
		)
		await userSessionModel.create({ userId: user.id, uuid: uuid, expire: expire })

		const session = await userSessionModel.getOneWith('userId', `${user.id}`)
		console.log('session: ' + session)
		if (userSessionModel.isInstance(session)) return session
		else return null
	}
	/**
	 * @desc        Log user out / clear cookie
	 * @route       POST /api/auth/logout
	 * @access      Private
	 */

	public async logout(req: Request, res: Response, next: NextFunction): Promise<Response> {
		let token = req.cookies['jwt']

		console.log(token)
		var decoded = jwt.decode(token)
		console.log(decoded)

		// res.cookie('jwt', 'none', {
		//   expires: new Date(Date.now())
		//   // httpOnly: true,
		//   // sameSite: true
		// })
		res.clearCookie('jwt')
		return res.json(ResTemplate.success({}))
	}

	/**
	 * @desc        Get current logged in user
	 * @route       POST /api/auth/me
	 * @access      Private
	 */

	public async getMe(req: Request, res: Response, next: NextFunction): Promise<Response> {
		// const user = await User.getUser(Number(req.params.id))
		//
		// res.status(200).json({
		// 	success: true,
		// 	data: user
		// })
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
				return res.status(200).json(ResTemplate.success({}))
			}
		}
		return res.status(410).json(ResTemplate.error('Page no more available'))
	}
}
