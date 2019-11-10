import {Request, Response, NextFunction} from "express"
import {User, UserManager} from "../models/User"
import Controller from './Controller'
import Joi from "joi"
import bcrypt from 'bcrypt'
import pug from 'pug'
import MailService from '../util/MailService'
import uuidv1 from 'uuid/v1'

export default class UserController extends Controller {

	/**
	 * @desc        Get users
	 * @route       GET /api/users
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
	 * @route       GET /api/users/:id
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
	 * @route       POST /api/users/
	 * @access      Public
	 */

	public static async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		let userService = new UserManager()
		// Validate
		Joi.validate(req.body, userService.accessibleScheme, (e: Joi.ValidationError) => {
			if (e) {
				res.statusCode = 406
				return res.json(this.responseTemplate(false, {}, e.message))
			}
		})
		// Hash password
		req.body.password = await bcrypt.hash(req.body.password, 10)
		// Insert to db
		let user: User | Error = await UserManager.create(req.body)
		if (UserManager.instanceOfUser(user)) {
			const uuid = uuidv1()
			const letter = pug.renderFile('../public/letters/AccountCreated.pug', {
				name: user.first_name + user.last_name,
				link: process.env.APP_SERVER + '/auth/emailConfirmation/' + user.id + uuid,
				imgSrc: process.env.APPSERVER + "/images/dating.jpg"
			})
			await MailService.sendMail('hurubashi@gmail.com', 'registration', letter)
			res.statusCode = 201
			return res.json(
				UserController.responseTemplate(true, user,
					'User successfully created')
			)
		} else {
			res.statusCode = 406
			return res.json(this.responseTemplate(false, {}, user.message))
		}

	}

	/**
	 * @desc        Update user
	 * @route       PUT /api/users/:id
	 * @access      Private/Admin
	 */

	public static async updateUser(req: Request, res: Response, next: NextFunction) {
		return res.json("Update user")
	}

	/**
	 * @desc        Delete user
	 * @route       DELETE /api/users/:id
	 * @access      Private/Admin
	 */

	public static async deleteUser(req: Request, res: Response, next: NextFunction) {
		return res.json("Delete user")
	}

}

