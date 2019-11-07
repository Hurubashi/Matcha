import {Request, Response, NextFunction} from "express"
import User from "../models/User"

export default class AuthController {

	/**
	 * @desc        Login user
	 * @route       POST /api/auth/register
	 * @access      Public
	 */

	public static async register(req: Request, res: Response, next: NextFunction) {
		return res.json("User registration")
	}

	/**
	 * @desc        Login user
	 * @route       POST /api/auth/login
	 * @access      Public
	 */

	public static async login(req: Request, res: Response, next: NextFunction) {
		return res.json("User login")
	}

	/**
	 * @desc        Log user out / clear cookie
	 * @route       POST /api/auth/logout
	 * @access      Private
	 */

	public static async logout(req: Request, res: Response, next: NextFunction) {
		// res.cookie('token', 'none', {
		// 	expires: new Date(Date.now() + 10 * 1000),
		// 	httpOnly: true
		// })
		//
		// res.status(200).json({
		// 	success: true,
		// 	data: {}
		// })
		return res.json("User logout")
	}

	/**
	 * @desc        Get current logged in user
	 * @route       POST /api/auth/me
	 * @access      Private
	 */

	public static async getMe(req: Request, res: Response, next: NextFunction) {
		// const user = await User.getUser(Number(req.params.id))
		//
		// res.status(200).json({
		// 	success: true,
		// 	data: user
		// })
		return res.json("Get me")

	}



}



