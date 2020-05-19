import RequesReduser, { Action } from './RequestReducer'

type MsgStatus = 'sended' | 'readed' | 'unreaded'

export type Chat = {
	id: number
	interlocutorId: number
	interlocutorName: string
	interlocutorAvatar?: string
	lastMsg?:
		| {
				senderId: number
				text: string
				time: Date
		  }
		| undefined
}

class ChatListReducer extends RequesReduser<Chat[]> {
	baseUrl = '/api/chat'
	getChats(dispatch: React.Dispatch<Action<Chat[]>>, onSuccess: () => void) {
		this.request(
			this.getReq(),
			(res) => {
				dispatch({ type: 'success', results: res['data']['data'] })
				onSuccess()
			},
			(err) => {
				dispatch({ type: 'failure', error: err })
			},
		)
	}
}

export default ChatListReducer
