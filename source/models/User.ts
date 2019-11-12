import knex from 'knex'
import {knexConfig} from "../config"
import Joi from 'joi'

let db = knex(knexConfig)

export interface User {
	id: number
	email: string
	username: string
	first_name: string
	last_name: string
	password: string
	is_verified: boolean
}

export class UserManager {

	static tableName: string = 'users'

	public scheme = {
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

	static instanceOfUser(object: any): object is User {
		return 'id' in object;
	}

	static get errorList() {
		return {
			'user_email_unique': 'This email is already taken',
			'user_username_unique': 'This username is already taken',
			'Unknown column': 'Unknown column'
		}
	}

	static async create(body: Object): Promise<User | Error> {
		try {
			let id: number[] = await db(this.tableName).insert(body)
			let user: User | undefined = await db<User>(this.tableName).where('id', id[0]).first()
			if (this.instanceOfUser(user)) {
				return user
			} else {
				return Error('Something went wrong')
			}
		} catch (e) {
			for (let [key, value] of Object.entries(this.errorList)) {
				if (e.sqlMessage && e.sqlMessage.includes(key)) {
					return new Error(value ? value : e.sqlMessage)
				}
			}
			return new Error(e)
		}
	}

	public static async getUsers(): Promise<User[]> {
		return db<User[]>(this.tableName)
			.select("*")
			.from(this.tableName)
	}

	public static async getUser(id: number): Promise<User | undefined> {
		return db<User>(this.tableName)
			.where('id', id)
			.first()
	}

	public static async updateUser(user: User, data: Object){
		return db(this.tableName)
			.where({ id: user.id })
			.update(data)
	}

}
