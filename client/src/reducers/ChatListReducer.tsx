import RequesReduser, { Action } from './RequestReducer'

export type Chat = {
	id: number
	firstUser: number
	secondUser: string
	isOpenFist: boolean
	isOpenSecond: boolean
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
