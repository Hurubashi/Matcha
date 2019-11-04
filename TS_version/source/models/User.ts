import knex from 'knex'
import {knexConfig} from "../config"
import Joi from 'joi'

let db = knex(knexConfig)

export default class User {

	private tableName: string = 'users'

	public accessible = {
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

	public visible = {
		is_verified: 0
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

	public async create() {
		return db(this.tableName).insert(this.accessible)
	}

	public async getUsers(){
		return db.select("*").from(this.tableName)
	}

	static get errorList() {
		return {
			'users_email_unique': 'This email is already taken',
			'users_username_unique': 'This username is already taken'
		}
	}
}