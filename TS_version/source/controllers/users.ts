import {Request, Response, NextFunction} from "express"
import User from "../models/User"

export default class UserController {
	/**
	 * @desc    Get users
	 * @method  GET
	 * @route   GET /api/users
	 * @access  Public
	 */

	public static getUsers(req: Request, res: Response, next: NextFunction): Response {
		return res.json("Get users" + `Current NODE_ENV is ${process.env.NODE_ENV}` + req.params['username'])
	}

	/**
	 * @desc    Get user
	 * @method  GET
	 * @route   GET /api/users/:id
	 * @access  Public
	 */

	public static getUser(req: Request, res: Response, next: NextFunction) {
		return res.json("Get user by id")
	}

	/**
	 * @desc    Create user
	 * @route   POST /api/users/
	 * @access  Public
	 */

	public static async createUser(req: Request, res: Response, next: NextFunction) {
		let user = new User()

		user.attributes.email = req.body.email
		user.attributes.username = req.body.username
		user.attributes.first_name = req.body.first_name
		user.attributes.last_name = req.body.last_name
		user.attributes.password = req.body.password
		user.attributes.is_verified = req.body.is_verified

		for(var k in user.attributes) user.attributes =firstObject[k];
		await user.create()
		return res.json("Create user" + req.body.email)
	}

	/**
	 * @desc    Update user
	 * @route   PUT /api/users/:id
	 * @access  Private/Admin
	 */

	public static updateUser(req: Request, res: Response, next: NextFunction) {
		return res.json("Update user")
	}

	/**
	 * @desc    Delete user
	 * @route   DELETE /api/users/:id
	 * @access  Private/Admin
	 */

	public static deleteUser(req: Request, res: Response, next: NextFunction) {
		return res.json("Delete user")
	}

}

