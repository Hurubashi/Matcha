import knex from 'knex'
import {knexConfig} from "../config"
let db = knex(knexConfig)

export interface UserActivationUUID {
	user_id: number,
	uuid:    string
}

export class UserActivationUUIDManager {

	static tableName: string = 'user_activation_uuid'

	static instanceOfUserActivationUUID(object: any): object is UserActivationUUID {
		return 'user_id' in object;
	}

	static async create(body: Object): Promise<UserActivationUUID | Error> {
		try {
			let id   = await db(this.tableName).insert(body)
			let uuid = await db<UserActivationUUID>(this.tableName).where('id', id[0]).first()
			if (this.instanceOfUserActivationUUID(uuid)) {
				return uuid
			} else {
				return Error('Cannot create uuid')
			}
		} catch (e) {
			return new Error(e)
		}
	}

}
