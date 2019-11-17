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
			if (e)
				return res.status(400).json(Controller.responseTemplate(false, {}, e.message))
		})
		// Hash password
		req.body.password = await bcrypt.hash(req.body.password, String(process.env.ENCRYPTION_SALT))
		// Insert to db
		let user: User | Error = await UserManager.create(req.body)
		if (UserManager.instanceOfUser(user)) {
			return res
				.status(201)
				.json(Controller.responseTemplate(true, user,
					'User successfully created')
			)
		} else {
			return res.status(400).json(Controller.responseTemplate(false, {}, user.message))
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

