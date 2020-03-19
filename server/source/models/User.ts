import Joi from 'joi'
import Model from './Model'
import { Interest, InterestModel } from './Interest'

export interface User {
	id: number
	email: string
	username: string
	firstName: string
	lastName: string
	password: string
	sex: 'male' | 'female' | undefined
	preferences: 'male' | 'female' | 'male and female' | undefined
	biography: string
	isVerified: boolean
}

export class UserModel extends Model<User> {
	tableName: string = 'user'
	indexRow: string = 'id'
	customSqlErrors: Object = {
		user_email_uindex: 'This email is already taken',
		user_username_uindex: 'This username is already taken',
		'Unknown column': 'Unknown column',
	}

	validate(obj: Object): Error | null {
		Joi.validate(obj, this.schema, (e: Joi.ValidationError) => {
			if (e) {
				return Error
			}
		})
		return null
	}

	public schema = {
		email: Joi.string()
			.email()
			.min(3)
			.required()
			.error((errors: Joi.ValidationErrorItem[]) => {
				return this.manageJoiErrors(errors, 'Email')
			}),
		username: Joi.string()
			.min(3)
			.required()
			.error((errors: Joi.ValidationErrorItem[]) => {
				return this.manageJoiErrors(errors, 'User name')
			}),
		firstName: Joi.string()
			.required()
			.error((errors: Joi.ValidationErrorItem[]) => {
				return this.manageJoiErrors(errors, 'First name')
			}),
		lastName: Joi.string()
			.required()
			.error((errors: Joi.ValidationErrorItem[]) => {
				return this.manageJoiErrors(errors, 'Last name')
			}),
		password: Joi.string()
			.min(6)
			.required()
			.error((errors: Joi.ValidationErrorItem[]) => {
				return this.manageJoiErrors(errors, 'Password')
			}),
	}

	private manageJoiErrors(errors: Joi.ValidationErrorItem[], field: String) {
		errors.forEach((err: Joi.ValidationErrorItem) => {
			switch (err.type) {
				case 'string.email':
					err.message = `${field} should be valid!`
					break
				case 'any.empty':
					err.message = `${field} should not be empty!`
					break
				case 'string.min':
					err.message = `${field} should have at least ${
						err.context ? err.context.limit : ''
					} characters!`
					break
				default:
					break
			}
		})
		return errors
	}

	async getInterest(userId: number): Promise<Interest[]> {
		const interestModel = new InterestModel()
		const res = await interestModel.getWhere(userId)
		console.log(res)
		return res
	}
}
