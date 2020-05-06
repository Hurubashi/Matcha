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
	getImages(dispatch: React.Dispatch<Action<Chat[]>>, url?: string) {
		this.requestDefault(this.getReq(), dispatch)
	}

	// closeChat = (id: number, dispatch: React.Dispatch<Action<Image[]>>) => {
	// 	this.request(
	// 		this.delReq(`/image/${id}`),
	// 		() => {
	// 			this.getImages(dispatch)
	// 		},
	// 		(err) => {
	// 			dispatch({ type: 'failure', error: err })
	// 		},
	// 	)
	// }
}

export default ChatListReducer
