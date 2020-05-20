import express from 'express'
import * as http from 'http'
// import cors from "cors"
import { Message, messageModel } from '../models/Message'
import { User } from '../models/User'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import ChatActions from '../actions/ChatActions'

import knex from 'knex'
import { knexConfig } from '../config'
let db = knex(knexConfig)

class ChatServer {
	public static readonly PORT: number = 8080
	private app: express.Application
	private server: http.Server
	private io: SocketIO.Server
	private port: string | number

	ids: string[] = []

	constructor() {
		this.app = express()
		// this.app.use(cors())
		this.port = process.env.SOCKET_PORT || ChatServer.PORT
		this.server = http.createServer(this.app)
		this.io = require('socket.io').listen(this.server, { origins: '*:*', cookie: false })
		this.listen()
	}

	private listen(): void {
		this.server.listen(this.port, () => {
			console.log('Running ChatServer on port %s', this.port)
		})

		this.io.on('connect', (socket: SocketIO.Socket) => {
			console.log('Connected client on port %s.', this.port)
			if (socket.handshake.headers.cookie) {
				var cookies = cookie.parse(socket.handshake.headers.cookie)
				var decoded = jwt.decode(cookies['jwt'])
				if (decoded && typeof decoded !== 'string') {
					this.ids[decoded.id] = socket.id
				}
			}

			socket.on('disconnect', () => {
				console.log('Client disconnected')
			})

			socket.on('message', async (message: any) => {
				console.log(message)
				if (socket.handshake.headers.cookie) {
					var cookies = cookie.parse(socket.handshake.headers.cookie)
					var decoded = jwt.decode(cookies['jwt'])
					if (decoded && typeof decoded !== 'string') {
						await this.sendPrivateMessage(message.chatId, decoded.id, message.receiverId, message.text)
					}
				}
			})
		})
	}

	async sendPrivateMessage(chatId: number, senderId: number, receiverId: number, text: string) {
		const [message, err] = await ChatActions.postMessage(chatId, senderId, text)
		if (message) {
			const messages = await db<Message>('message').where({ chatId: chatId }).orderBy('time', 'desc').limit(40)

			const reverced = messages.reverse()
			this.io.to(this.ids[senderId]).emit('messageSent', reverced)
			if (senderId !== receiverId) {
				this.io.to(this.ids[receiverId]).emit('message', reverced)
			}
			await this.refreshChatListForUsers(senderId, receiverId)
		}
	}

	async refreshChatListForUsers(userId1: number, userId2: number) {
		console.log('chatlist refresh')
		const chatResp1 = await ChatActions.getChats(userId1)
		const chatResp2 = await ChatActions.getChats(userId2)

		this.io.to(this.ids[userId1]).emit('chatlist', chatResp1)
		this.io.to(this.ids[userId2]).emit('chatlist', chatResp2)
	}
}

export const chatServer = new ChatServer()
