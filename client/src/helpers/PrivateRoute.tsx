import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isUser } from './getJwt'
import PrimaryAppBar from '../components/layout/PrimaryAppBar'
import UserReducer from '../reducers/UserReducer'
import { UserContextProvider } from './UserContextProvider'
import Chat from '../components/chat/index'
import { Grid, Card, Container, Box } from '@material-ui/core'

interface Props {
	path: string
	component: React.FC
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
	const [state, dispatch] = React.useReducer(UserReducer.reducer, { status: 'loading' })

	React.useEffect(() => {
		UserReducer.getUser(dispatch)
	}, [])

	return isUser() ? (
		<React.Fragment>
			<UserContextProvider value={{ state, dispatch }}>
				<Container>
					<Card>
						<Grid container>
							<Grid item xs={3}>
								<Chat />
							</Grid>
							<Grid item xs={9}>
								<PrimaryAppBar />
								<Box m={2} style={{ height: '80vh', overflowY: 'scroll' }}>
									<Route path={props.path} component={props.component} />
								</Box>
							</Grid>
						</Grid>
					</Card>
				</Container>
			</UserContextProvider>
		</React.Fragment>
	) : (
		<Redirect to='/login' />
	)
}

export default PrivateRoute
