import RequesReduser, { Action } from './RequestReducer'

export type Message = {
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

class MessageReducer extends RequesReduser<Message[]> {
	baseUrl = '/chat'
	getImages(dispatch: React.Dispatch<Action<Message[]>>, url?: string) {
		this.requestDefault(this.getReq(), dispatch)
	}
}

export default MessageReducer
