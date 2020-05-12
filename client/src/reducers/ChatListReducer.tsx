import RequesReduser, { Action } from './RequestReducer'

type MsgStatus = 'sended' | 'readed' | 'unreaded'

export type Chat = {
	id: number
	interlocutorId: number
	interlocutorName: string
	interlocutorAvatar?: string
	lastMsg?:
		| {
				text: string
				time: Date
		  }
		| undefined
}

class ChatListReducer extends RequesReduser<Chat[]> {
	baseUrl = '/chat'
	getChats(dispatch: React.Dispatch<Action<Chat[]>>, url?: string) {
		this.requestDefault(this.getReq(), dispatch)
	}
}

export default ChatListReducer
