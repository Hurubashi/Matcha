import {Request, Response, NextFunction} from "express"
import User from "../models/User"
import lodash from 'lodash'
import Joi from "joi"
import bcrypt from 'bcrypt'

export default class UserController {
	/**
	 * @desc    Get users
	 * @method  GET
	 * @route   GET /api/users
	 * @access  Public
	 */

	public static async getUsers(req: Request, res: Response, next: NextFunction) {
		let user = new User()
		let users = await user.getUsers()
		return res.json(
			{
				code: res.statusCode,
				data: users
			})
	}

	/**
	 * @desc    Get user
	 * @method  GET
	 * @route   GET /api/users/:id
	 * @access  Public
	 */

	public static async getUser(req: Request, res: Response, next: NextFunction) {
		let user = new User()
		let userById = await user.getUser(Number(req.params.id))
		return res.json(
			{
				code: res.statusCode,
				data: userById
			})
	}

	/**
	 * @desc    Create user
	 * @route   POST /api/users/
	 * @access  Public
	 */

	public static async createUser(req: Request, res: Response, next: NextFunction) {
		let user = new User()
		await Joi.validate(req.body, user.accessible, (e: Joi.ValidationError) => {
			if (e) {
				return res.json(
					{
						code: res.statusCode,
						error: e.message
					})
			}
		})
		req.body.password = await bcrypt.hash(req.body.password, 10)
		user.accessible = lodash.merge(user.accessible, req.body);
		try {
			await user.create()
		} catch (e) {
			for (let [key, value] of Object.entries(User.errorList)) {
				if (e.sqlMessage && e.sqlMessage.includes(key)) {
					return res.json(
						{
							code: res.statusCode,
							error: value ? value : e.sqlMessage
						})
				}
			}
		}
		return res.json(
			{
				code: res.statusCode,
				data: lodash.merge(user.accessible, user.visible)
			})
	}

	/**
	 * @desc    Update user
	 * @route   PUT /api/users/:id
	 * @access  Private/Admin
	 */

	public static async updateUser(req: Request, res: Response, next: NextFunction) {
		return res.json("Update user")
	}

	/**
	 * @desc    Delete user
	 * @route   DELETE /api/users/:id
	 * @access  Private/Admin
	 */

	public static async deleteUser(req: Request, res: Response, next: NextFunction) {
		return res.json("Delete user")
	}

}

