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
		let user = new User()
		user.attributes.username = "Vasya"
		user.attributes.email = "vasya@gmail.com"
		return res.json("Get users" + `Current NODE_ENV is ${process.env.NODE_ENV}`)
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

	public static createUser(req: Request, res: Response, next: NextFunction) {
		return res.json("Create user")
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

