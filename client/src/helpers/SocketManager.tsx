import io from 'socket.io-client'

export class SocketManager {
	address = process.env.REACT_APP_SOCKET_SERVER || 'http://localhost:5001'
	socket: SocketIOClient.Socket = io(this.address)

	constructor() {
		this.socket.on('error', function (err: any) {
			console.log('received socket error:')
			console.log(err)
		})

		this.socket.on('connect', function () {
			console.log('socket successfuly connected!')
			console.log(process.env.REACT_APP_SOCKET_SERVER)
		})
	}

	sendMessage(message: { chatId: number; receiverId: number; text: string }) {
		console.log('sending message')
		console.log(message)
		this.socket.emit('message', message)
	}
}
