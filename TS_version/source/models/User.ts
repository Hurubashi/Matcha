import knex from 'knex'
import {knexConfig} from "../config"
let db = knex(knexConfig)

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
		return db(this.tableName).insert(this.attributes)
	}

	public async getUsers(){
		return db.select("*").from(this.tableName)
	}
}