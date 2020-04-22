import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContextConsumer } from '../../helpers/UserContextProvider'
import UserReducer from '../../reducers/UserReducer'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography/Typography'

const UserPage: React.FC = () => {
	const { user } = useParams()
	const [state, dispatch] = React.useReducer(UserReducer.reducer, { status: 'loading' })

	useEffect(() => {
		UserReducer.getUser(dispatch, '/' + user)
	}, [user])

	return (
		<UserContextConsumer>
			{(ctx) =>
				ctx && (
					<Container>
						<Typography>
							{ctx.state.status}
							{state.status === 'success' && state.data.firstName}
						</Typography>
					</Container>
				)
			}
		</UserContextConsumer>
	)
}

export default UserPage
