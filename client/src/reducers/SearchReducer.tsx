import RequesReduser, { Action } from './RequestReducer'
import { User } from './UserReducer'

interface Results {
	users: User[]
	pages: number
}
class UserReducer extends RequesReduser<User[]> {
	baseUrl = '/api/search'

	searchUsers(dispatch: React.Dispatch<Action<User[]>>, query?: string) {
		this.requestDefault(this.getReq(`/api/search?${query}`), dispatch)
	}
}

export default UserReducer
