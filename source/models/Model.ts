import knex from 'knex'
import {knexConfig} from "../config"
let db = knex(knexConfig)

export default abstract class Model<T> {

	abstract tableName: string
	abstract indexRow: string
	abstract customSqlErrors: Object

	public isInstance(object: any): object is T {
		return this.indexRow in object;
	}

	async create(src: Object): Promise<T | Error> {
		try {
			let id = await db(this.tableName).insert(src)
			let obj = await db<T>(this.tableName).where(this.indexRow, id[0]).first()
			if (this.isInstance(obj))
				return obj
			else
				return new Error(`Cannot create ${this.tableName} with ${src}`)
		} catch (e) {
			return this.errorMsg(e.message)
		}
	}

	async getAll(): Promise<T[]> {
		return db<T>(this.tableName)
			.select("*")
			.from(this.tableName)
	}

	async getOne(index: number): Promise<T | Error> {
		try {
			let result = db<T>(this.tableName)
				.where(this.indexRow, index)
				.first()
			if (this.isInstance(result))
				// @ts-ignore
				return result
			else
				return new Error(`Cannot find ${this.tableName} with ${this.indexRow} of ${index}`)
		} catch (e) {
			return this.errorMsg(e.message)
		}
	}

	async getOneWith(params: Object): Promise<T | Error> {
		try {
			let result = await db<T>(this.tableName)
				.where({username: 'hurubashi'})
				.first()
			if (this.isInstance(result))
				// @ts-ignore
				return result
			else
				return new Error(`Cannot find ${this.tableName} with ${params}`)
		} catch (e) {
			return this.errorMsg(e.message)
		}
	}

	async updateWhere(where: Object, update: Object){
		return db(this.tableName)
			.where(where)
			.update(update)
	}

	private errorMsg(msg: string): Error{
		for (let [key, value] of Object.entries(this.customSqlErrors)) {
			if (msg.includes(key)) {
				return new Error(value ? value : msg)
			}
		}
		return new Error(msg)
	}

}