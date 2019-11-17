import knex from 'knex'
import {knexConfig} from "../config"
let db = knex(knexConfig)

import {ModelManager} from "./ModelManager"

export interface UserSession {
	user_id?: number,
	uuid?:    string
}

export class UserSessionManager extends ModelManager {

	tableName: string = 'user_session'
	indexRow: string = 'user_id'

	instanceOf(object: any): object is UserSession {
		return 'user_id' in object;
	}

}
