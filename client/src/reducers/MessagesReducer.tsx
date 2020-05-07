import RequesReduser, { Action } from './RequestReducer'

export type Message = {
	id?: number
	chatId: number
	senderId?: number
	message: string
	time?: Date
}

class MessageReducer extends RequesReduser<Message[]> {
	baseUrl = '/message'
	getMessages(dispatch: React.Dispatch<Action<Message[]>>, chatId: number) {
		this.requestDefault(this.getReq(`/message/chat/${chatId}`), dispatch)
	}
}

export default MessageReducer
