import io from 'socket.io-client'

export class SocketManager {
	address = process.env.REACT_APP_SOCKET_SERVER || 'http://localhost:5001'
	socket: SocketIOClient.Socket = io(this.address)

	constructor() {
		this.socket.on('error', function (err: any) {})

		this.socket.on('connect', function () {
			// socket successfuly connected!
		})
	}

	sendMessage(message: { chatId: number; receiverId: number; text: string }) {
		this.socket.emit('message', message)
	}
}
