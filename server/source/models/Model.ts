import knex from 'knex'
import { knexConfig } from '../config'
let db = knex(knexConfig)

interface KeyValue {
	[key: string]: any
}

export default abstract class Model<T> {
	abstract tableName: string
	abstract indexRow: string
	abstract customSqlErrors: Object
	abstract accessibleColumns: string[]

	public isInstance(object: any): object is T {
		return this.indexRow in object
	}

	async create(src: Object): Promise<T | Error> {
		try {
			let id = await db(this.tableName).insert(src)
			let obj = await db<T>(this.tableName).where('id', id[0]).first()
			if (this.isInstance(obj)) return obj
			else throw Error(`Cannot create ${this.tableName} with ${src}`)
		} catch (e) {
			return this.errorMsg(e.message)
		}
	}

	async getAll(): Promise<T[]> {
		return db<T>(this.tableName).select('*').from(this.tableName)
	}

	async getWhere(params: Object, columns?: [String] | undefined): Promise<T[]> {
		const res = await db<T>(this.tableName)
			.select(columns ? columns : '*')
			.where(params)
			.from(this.tableName)
		return res
	}

	async getOne(index: number | string): Promise<T | Error> {
		try {
			let result = await db<T>(this.tableName).where(this.indexRow, index).first()
			if (this.isInstance(result)) {
				return result
			} else {
				throw new Error(`Cannot find ${this.tableName} with ${this.indexRow} of ${index}`)
			}
		} catch (e) {
			throw this.errorMsg(e.message)
		}
	}

	async getOneWith(field: string, value: string): Promise<T | Error> {
		try {
			let result = await db<T>(this.tableName).where(field, value).first()
			if (result && this.isInstance(result)) {
				return result
			} else {
				throw new Error(`Cannot find ${field} with ${value}`)
			}
		} catch (e) {
			throw this.errorMsg(e.message)
		}
	}

	async updateWhere(where: Object, update: Object): Promise<void | Error> {
		try {
			await db(this.tableName).where(where).update(update)
		} catch (e) {
			throw this.errorMsg(e.sqlMessage)
		}
	}

	async delete(where: Object) {
		return db(this.tableName).where(where).delete()
	}

	fillAccessibleColumns(args: any): KeyValue {
		let obj: KeyValue = {}

		this.accessibleColumns.forEach((elem) => {
			if (args[elem]) {
				obj[elem] = args[elem]
			}
		})
		return obj
	}

	private errorMsg(msg: string): Error {
		for (let [key, value] of Object.entries(this.customSqlErrors)) {
			if (msg.includes(key)) {
				return new Error(value ? value : msg)
			}
		}
		return new Error(msg)
	}
}
