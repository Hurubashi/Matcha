import knex from 'knex'
import {knexConfig} from "../config"
import Joi from 'joi'

let db = knex(knexConfig)


interface UserAccessible {
	email: string
	username: string
	first_name: string
	last_name: string
	password: string
}

interface UserVisible {
	id: number
	is_verified: boolean
}

export default class User {

	static tableName: string = 'users'

	public accessibleScheme = {
		email: Joi.string().email().min(3).required().error( (errors: Joi.ValidationErrorItem[]) => {
			return this.manageJoiErrors(errors, 'Email')
		}),
		username: Joi.string().min(3).required().error( (errors: Joi.ValidationErrorItem[]) => {
			return this.manageJoiErrors(errors, 'User name')
		}),
		first_name: Joi.string().required().error( (errors: Joi.ValidationErrorItem[]) => {
			return this.manageJoiErrors(errors, 'First name')
		}),
		last_name: Joi.string().required().error( (errors: Joi.ValidationErrorItem[]) => {
			return this.manageJoiErrors(errors, 'Last name')
		}),
		password: Joi.string().min(6).required().error( (errors: Joi.ValidationErrorItem[]) => {
			return this.manageJoiErrors(errors, 'Password')
		}),
	}

	public accessible: UserAccessible = {
		email: "",
		username: "",
		first_name: "",
		last_name: "",
		password: ""
	}

	public visible: UserVisible = {
		id: 0,
		is_verified: false
	}

	private manageJoiErrors(errors: Joi.ValidationErrorItem[], field: String){
		errors.forEach((err: Joi.ValidationErrorItem) => {
			switch (err.type) {
				case "string.email":
					err.message = `${field} should be valid!`;
					break
				case "any.empty":
					err.message = `${field} should not be empty!`;
					break
				case "string.min":
					err.message = `${field} should have at least ${err.context ? err.context.limit : ""} characters!`;
					break
				default:
					break
			}
		})
		return errors
	}

	public async create(): Promise<undefined | Error> {
		try {
			let id: number[] = await db(User.tableName).insert(this.accessible)
			this.visible.id = id[0]
			return
		} catch (e) {
			for (let [key, value] of Object.entries(User.errorList)) {
				if (e.sqlMessage && e.sqlMessage.includes(key)) {
					throw new Error(value ? value : e.sqlMessage)
				}
			}
		}
		return db(User.tableName).insert(this.accessible)
	}

	public static async getUsers() {
		return db.select("*").from(this.tableName)
	}

	public static async getUser(id: number) {
		return db(this.tableName).where('id', id)
	}

	static get errorList() {
		return {
			'user_email_unique': 'This email is already taken',
			'user_username_unique': 'This username is already taken'
		}
	}
}