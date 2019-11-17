import knex from 'knex'
import {knexConfig} from "../config"
let db = knex(knexConfig)
import lodash from "lodash"
import {stringify} from "querystring"

export abstract class ModelManager {

	abstract tableName: string
	abstract indexRow: string

	async create<T>(obj: T): Promise<T | Error> {
		try {
			let id = await db(this.tableName).insert(obj)
			let session = await db(this.tableName).where(this.indexRow, id[0]).first()
			lodash.merge(obj, session)
			return obj
		} catch (e) {
			return new Error(e)
		}
	}

	async getAll<T>(template: T): Promise<T[]> {
		return db<T[]>(this.tableName)
			.select("*")
			.from(this.tableName)
	}

	async getOne<T>(index: number, template: T): Promise<T | Error> {
		try {
			let result = db<T>(this.tableName)
				.where(this.indexRow, index)
				.first()
			if (result == undefined) {
				return new Error(`Cannot find ${this.tableName} with ${this.indexRow} of ${index}`)
			} else {
				lodash.merge(template, result)
				return template
			}
		} catch (e) {
			return new Error(e)
		}
	}

	async getOneWith<T>(params: Object, template: T): Promise<T | Error | undefined> {
		try {
			let result = db<T>(this.tableName)
				.where(params)
				.first()
			if (result == undefined) {
				return new Error(`Cannot find ${this.tableName} with ${stringify(params as any)}`)
			} else {
				lodash.merge(template, result)
				return template
			}
		} catch (e) {
			return new Error(e)
		}
	}

	async updateWhere<T>(obj: T, where: Object, data: Object){
		let result =  db(this.tableName)
			.where(where)
			.update(data)
		lodash.merge(obj, result)
		return obj
	}

}