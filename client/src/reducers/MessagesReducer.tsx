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
	getMessages(dispatch: React.Dispatch<Action<Message[]>>, chatId: number, onSuccess: () => void) {
		this.request(
			this.getReq(`/message/chat/${chatId}`),
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

export default MessageReducer
