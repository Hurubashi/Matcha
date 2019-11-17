import {Request, Response, NextFunction} from "express"
import Controller from './Controller'
import {User, UserManager} from "../models/User"
import Joi, {number} from "joi"
import bcrypt from "bcrypt"
import uuidv1 from "uuid/v1"
import {UserActivationUUID, UserActivationUUIDManager} from "../models/UserActivationUUID"
import {UserSession, UserSessionManager} from "../models/UserSession"
import pug from "pug"
import MailService from "../util/MailService"
import path from "path"
import jwt from "jsonwebtoken"

export default class AuthController extends Controller{

	/**
	 * @desc        Login user
	 * @route       POST /api/auth/register
	 * @access      Public
	 */

	public static async register(req: Request, res: Response, next: NextFunction) {
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
	 * @desc        Login user
	 * @route       POST /api/auth/login
	 * @access      Public
	 */

	public static async login(req: Request, res: Response, next: NextFunction) {
		const user = UserManager.getUserBy({username: req.body.username})
		if(UserManager.instanceOfUser(user)){
			const password = await bcrypt.hash(req.body.password, String(process.env.ENCRYPTION_SALT))
			if(user.is_verified && user.password == password){

				const options = {
					expires: new Date(
						Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
					),
					httpOnly: true
				}

				const token = jwt.sign({ id: user.id }, user, {expiresIn: Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60})
				return res
					.status(201)
					.cookie('token', token, options)
					.json(Controller.responseTemplate(true, user,
						'User successfully created')
					)
			}
		}
		return res.json("Something went wrong")
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

	/**
	 * @desc        Verify user
	 * @route       POST /api/auth/verify/:id/:uuid
	 * @access      Public
	 */

	public static async verify(req: Request, res: Response, next: NextFunction) {
		const userId = Number(req.params.id)
		const userActivationUUID = await UserActivationUUIDManager.findByUserId(userId)
		const user = await UserManager.getUser(userId)
		console.log(userId, user)
		if (UserActivationUUIDManager.instanceOfUserActivationUUID(userActivationUUID) && UserManager.instanceOfUser(user)){
			if(userActivationUUID.user_id == userId && userActivationUUID.uuid == req.params.uuid) {
				await UserManager.updateUser(user, {is_verified : true})
				res.statusCode = 200
				return res.json(Controller.responseTemplate(true, {}, 'Email confirmed. Account activated.'))
			}
		}
		res.statusCode = 410 // 410 - Gone
		return res.json(Controller.responseTemplate(true, {}, 'Page no more available'))
	}


}



