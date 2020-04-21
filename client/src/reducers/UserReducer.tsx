import RequesReduser, { State, Action } from './RequestReducer'

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
	interests: string[]
	biography: string
}

class UserReducer extends RequesReduser<User> {
	baseUrl = '/user'

	getUser(dispatch: React.Dispatch<Action<User>>) {
		this.request(this.getReq(), dispatch)
	}

	saveUser(data: User, dispatch: React.Dispatch<Action<User>>, cb: () => void) {
		this.request(this.putReq(data), dispatch, cb)
	}
}

export default new UserReducer()
