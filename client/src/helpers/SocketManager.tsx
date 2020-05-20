import io from 'socket.io-client'

export class SocketManager {
	socket: SocketIOClient.Socket = io('http://localhost:5001')

	constructor() {
		this.socket.on('error', function (err: any) {
			console.log('received socket error:')
			console.log(err)
		})

		this.socket.on('connect', function () {
			console.log('socket successfuly connected!')
		})
	}

	sendMessage(message: { chatId: number; receiverId: number; text: string }) {
		console.log('sending message')
		console.log(message)
		this.socket.emit('message', message)
	}
}
