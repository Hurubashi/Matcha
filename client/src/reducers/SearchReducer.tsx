import RequesReduser, { Action } from './RequestReducer'
import { User } from './UserReducer'

interface Results {
	users: User[]
	pages: number
}
class UserReducer extends RequesReduser<User[]> {
	url = '/search'
	baseURL = process.env.REACT_APP_API_URL

	searchUsers(dispatch: React.Dispatch<Action<User[]>>, query?: string) {
		console.log('search users: ' + query)
		this.requestDefault(this.getReq(`/search?${query}`), dispatch)
	}
}

export default UserReducer
