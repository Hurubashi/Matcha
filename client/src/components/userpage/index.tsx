import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContextConsumer } from '../../helpers/UserContextProvider'
import UserReducer from '../../reducers/UserReducer'

const UserPage: React.FC = () => {
	const { user } = useParams()
	const [state, dispatch] = React.useReducer(UserReducer.reducer, { status: 'loading' })

	React.useEffect(() => {
		UserReducer.getUser(dispatch, '/' + user)
	}, [])

	return (
		<UserContextConsumer>
			{(ctx) =>
				ctx && (
					<div>
						{ctx.state.status}
						{state.status === 'success' && state.data.firstName}
					</div>
				)
			}
		</UserContextConsumer>
	)
}

export default UserPage
