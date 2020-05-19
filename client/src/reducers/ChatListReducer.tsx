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
	url = '/chat'
	baseURL = process.env.REACT_APP_API_URL
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
