import RequesReduser, { Action } from './RequestReducer'

export type HeartStatus = { hearIsGiven: boolean }

class HeartReducer extends RequesReduser<HeartStatus> {
	baseUrl = '/heart'

	giveHurt(dispatch: React.Dispatch<Action<HeartStatus>>, userId: number) {
		this.request(
			this.postReq({}, `/heart/${userId}`),
			(res) => {
				dispatch({ type: 'success', results: res['data']['data'] })
			},
			(err) => {
				dispatch({ type: 'failure', error: err })
			},
		)
	}

	returnHurt(dispatch: React.Dispatch<Action<HeartStatus>>, userId: number) {
		this.request(
			this.delReq(`/heart/${userId}`),
			(res) => {
				dispatch({ type: 'success', results: res['data']['data'] })
			},
			(err) => {
				dispatch({ type: 'failure', error: err })
			},
		)
	}
}

export default HeartReducer
