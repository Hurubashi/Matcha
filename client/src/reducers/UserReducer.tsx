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
	interests: string[]
	biography: string
}

class UserReducer extends RequesReduser<User> {
	getUser(dispatch: React.Dispatch<Action<User>>) {
		console.log('GET USER')
		this.request(this.getReq(), dispatch)
	}

	saveUser(data: User, dispatch: React.Dispatch<Action<User>>, onSuccess: () => void) {
		this.request(this.putReq(data), dispatch, onSuccess)
	}
}

export default new UserReducer('/user')
