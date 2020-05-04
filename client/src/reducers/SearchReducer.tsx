import RequesReduser, { Action } from './RequestReducer'
import { User } from './UserReducer'

interface Results {
	users: User[]
	pages: number
}
class UserReducer extends RequesReduser<User[]> {
	baseUrl = '/search'

	searchUsers(dispatch: React.Dispatch<Action<User[]>>, query?: string) {
		console.log('search users: ' + query)
		this.requestDefault(this.getReq(`/search?${query}`), dispatch)
	}
}

export default UserReducer
