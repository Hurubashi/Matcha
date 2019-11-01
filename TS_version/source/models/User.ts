import knex from 'knex'
import {knexConfig} from "../config"
knex(knexConfig)

export default class User {

	private tableName: string = 'users'

	public attributes = {
		email: "",
		username: "",
		first_name: "",
		last_name: "",
		password: "",
		is_verified: ""
	}

	public async create() {
		return knex(this.tableName).insert(this.attributes)
	}

}