import knex from 'knex'
import {knexConfig} from "../config"
import Joi from 'joi'

let db = knex(knexConfig)

import {ModelManager} from "./ModelManager"

export interface User {
	id: number
	email: string
	username: string
	first_name: string
	last_name: string
	password: string
	is_verified: boolean
}

export class UserManager extends ModelManager {

    tableName: string = 'user'
    indexRow: string = 'id'

	public schema = {
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
		cPassword: Joi.equal(Joi.ref('password')).error( (errors: Joi.ValidationErrorItem[]) => {
			return this.manageJoiErrors(errors, 'Password confirmation')
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



}
