import {Request, Response, NextFunction} from "express"
import User from "../models/User"
import lodash from 'lodash'
import Joi from "joi"
import bcrypt from 'bcrypt'
import pug from 'pug'
import MailService from '../util/MailService'
import uuidv1 from 'uuid/v1'

function responseTemplate(success: Boolean, data: Object, message: String): Object {
	return {
		success:    success,
		message:    message,
		data:       data,
	}
}

export default class UserController {
	/**
	 * @desc        Get users
	 * @route       GET /api/users
	 * @access      Public
	 */

	public static async getUsers(req: Request, res: Response, next: NextFunction) {
		let user = await User.getUsers()
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
		let user = await User.getUser(Number(req.params.id))
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
		let user = new User()
		// Validate
		Joi.validate(req.body, user.accessibleScheme, (e: Joi.ValidationError) => {
			if (e) {
				res.statusCode = 406
				return res.json(responseTemplate(false, {}, e.message))
			}
		})
		// Hash password
		req.body.password = await bcrypt.hash(req.body.password, 10)
		user.accessible = lodash.merge(user.accessible, req.body);
		// Insert to db
		try  {
			await user.create()
			const uuid = uuidv1()
			const letter = pug.renderFile('../public/letters/AccountCreated.pug', {
				name: req.body.first_name + req.body.last_name,
				link: process.env.APP_SERVER + '/auth/emailConfirmation/' + uuid,
				imgSrc: process.env.APP_SERVER + "/images/dating.jpg"
			})
			await MailService.sendMail('hurubashi@gmail.com', 'registration', letter)
			res.statusCode = 201
			return res.json(
				responseTemplate(true, lodash.merge(user.accessible, user.visible),
					'User successfully created')
			)
		}
		catch (e) {
			res.statusCode = 406
			return res.json(responseTemplate(false, {}, e.message))
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

