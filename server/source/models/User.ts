import Joi, { string } from 'joi'
import Model from './Model'
import { Interest, InterestModel } from './Interest'
import { LookingFor, LookingForModel } from './LookingFor'

export interface User {
	id: number
	email: string
	username: string
	firstName: string
	lastName: string
	password: string
	gender: 'male' | 'female' | '' | undefined
	preferences: 'male' | 'female' | 'male and female'
	avatar: number | undefined
	biography: string | undefined
	isVerified: boolean
	lat: number | undefined
	lon: number | undefined
	birth: Date
}

export interface PublicProfile {
	id: number
	email: string
	username: string
	firstName: string
	lastName: string
	gender: 'male' | 'female' | '' | undefined
	preferences: 'male' | 'female' | 'male and female'
	avatar:
		| {
				normal: string
				thumbnail: string
		  }
		| undefined
	biography: string | undefined
	interests: string[]
	lookingFor: string[]
	lat: number | undefined
	lon: number | undefined
	distance?: number
	heartIsGiven: boolean
	heartsNumber: number
	age: number
}

class UserModel extends Model<User> {
	tableName: string = 'user'
	indexRow: string = 'id'
	customSqlErrors: Object = {
		user_email_uindex: 'This email is already taken',
		user_username_uindex: 'This username is already taken',
		'Unknown column': 'Something went wrong',
		"Data truncated for column 'sex'": 'Sex value allowed [male | female]',
	}
	accessibleColumns = [
		'username',
		'firstName',
		'lastName',
		'email',
		'gender',
		'preferences',
		'biography',
		'lat',
		'lon',
		'birth',
		'avatar',
	]

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
		birth: Joi.date().required(),
		gender: Joi.string().required(),
	}

	private manageJoiErrors(errors: Joi.ValidationErrorItem[], field: string) {
		errors.forEach((err: Joi.ValidationErrorItem) => {
			switch (err.type) {
				case 'string.email':
					err.message = `${field} should be valid!`
					break
				case 'any.empty':
					err.message = `${field} should not be empty!`
					break
				case 'string.min':
					err.message = `${field} should have at least ${err.context ? err.context.limit : ''} characters!`
					break
				default:
					break
			}
		})
		return errors
	}

	async getInterests(userId: Number): Promise<Interest[]> {
		const interestModel = new InterestModel()
		const res = await interestModel.getWhere({ userId: userId }, ['name'])
		return res
	}

	async setInterests(userId: Number, interests: [string]) {
		const interestModel = new InterestModel()

		interests.forEach(async (name) => {
			await interestModel.create({ userId: userId, name: name })
		})
		const res = await interestModel.getWhere({ userId: userId }, ['name'])
		return res
	}

	async getLookingFor(userId: Number): Promise<Interest[]> {
		const lookingForModel = new LookingForModel()
		const res = await lookingForModel.getWhere({ userId: userId }, ['name'])
		return res
	}

	async setLookingFor(userId: Number, lookingFor: [string]) {
		const lookingForModel = new LookingForModel()

		lookingFor.forEach(async (name) => {
			await lookingForModel.create({ userId: userId, name: name })
		})
		const res = await lookingForModel.getWhere({ userId: userId }, ['name'])
		return res
	}
}

export const userModel = new UserModel()
