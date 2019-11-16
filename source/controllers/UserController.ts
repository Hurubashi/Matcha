import {Request, Response, NextFunction} from "express"
import bcrypt from 'bcrypt'
import uuidv1 from 'uuid/v1'
import Joi from "joi"
import pug from 'pug'
import MailService from '../util/MailService'
import {User, UserManager} from "../models/User"
import {UserActivationUUID, UserActivationUUIDManager} from '../models/UserActivationUUID'
import Controller from './Controller'
import path from 'path';
import jwt from 'jsonwebtoken'

export default class UserController extends Controller {

	/**
	 * @desc        Get user
	 * @route       GET /api/user
	 * @access      Public
	 */

	public static async getUsers(req: Request, res: Response, next: NextFunction) {
		let user: User[] = await UserManager.getUsers()
		return res.json(
			{
				code: res.statusCode,
				data: user
			})
	}

	/**
	 * @desc        Get user
	 * @route       GET /api/user/:id
	 * @access      Public
	 */

	public static async getUser(req: Request, res: Response, next: NextFunction) {
		let user = await UserManager.getUser(Number(req.params.id))
		return res.json(
			{
				code: res.statusCode,
				data: user
			})
	}

	/**
	 * @desc        Create user
	 * @route       POST /api/user/
	 * @access      Public
	 */

	public static async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		let userService = new UserManager()
		// Validate
		Joi.validate(req.body, userService.schema, (e: Joi.ValidationError) => {
			if (e) {
				res.statusCode = 400
				return res.json(Controller.responseTemplate(false, {}, e.message))
			}
		})
		// Hash password
		req.body.password = await bcrypt.hash(req.body.password, String(process.env.ENCRYPTION_SALT))
		// Insert to db
		let user: User | Error = await UserManager.create(req.body)
		if (UserManager.instanceOfUser(user)) {
			const uuid = uuidv1()
			const userActivationUUID: UserActivationUUID = {user_id: user.id, uuid: uuid}
			await UserActivationUUIDManager.create(userActivationUUID)

			const letter = pug.renderFile( path.resolve('public/letters/AccountCreated.pug'), {
				name: user.first_name + user.last_name,
				link: req.protocol + '://' + req.get('host') + 'api//auth/verify/' + user.id + '/' + uuid,
				imgSrc: req.protocol + '://' + req.get('host') + "public/images/dating.jpg"
			})
			await MailService.sendMail('hurubashi@gmail.com', 'registration', letter)
			const options = {
				expires: new Date(
					Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
				),
				httpOnly: true
			}

			const token = jwt.sign({ id: user.id }, uuid, {expiresIn: Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60})
			return res
				.status(201)
				.cookie('token', token, options)
				.json(Controller.responseTemplate(true, user,
					'User successfully created')
			)
		} else {
			res.statusCode = 400
			return res.json(Controller.responseTemplate(false, {}, user.message))
		}

	}

	/**
	 * @desc        Update user
	 * @route       PUT /api/user/:id
	 * @access      Private/Admin
	 */

	public static async updateUser(req: Request, res: Response, next: NextFunction) {
		return res.json("Update user")
	}

	/**
	 * @desc        Delete user
	 * @route       DELETE /api/user/:id
	 * @access      Private/Admin
	 */

	public static async deleteUser(req: Request, res: Response, next: NextFunction) {
		return res.json("Delete user")
	}

}

