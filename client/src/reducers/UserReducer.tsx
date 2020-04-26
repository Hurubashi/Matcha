import RequesReduser, { Action } from './RequestReducer'

type Gender = 'male' | 'female' | ''
type Preferences = 'male' | 'female' | 'male and female' | ''

export type User = {
	username: string
	email: string
	firstName: string
	lastName: string
	gender: Gender
	preferences: Preferences
	avatarUrl: string | undefined
	avatar: string | undefined
	lookingFor: string[]
	interests: string[]
	biography: string
}

class UserReducer extends RequesReduser<User> {
	getUser(dispatch: React.Dispatch<Action<User>>, url?: string) {
		this.requestDefault(this.getReq(`/user/${url}`), dispatch)
	}

	saveUser(data: User, dispatch: React.Dispatch<Action<User>>, onSuccess: () => void) {
		this.request(
			this.putReq(data),
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

export default new UserReducer('/user')
