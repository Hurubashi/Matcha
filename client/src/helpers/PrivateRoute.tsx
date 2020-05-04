import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isUser } from './getJwt'
import PrimaryAppBar from '../components/layout/PrimaryAppBar'
import UserReducer from '../reducers/UserReducer'
import { UserContextProvider } from './UserContextProvider'
import Chat from '../components/chat/index'
import { Grid, Card, Container, Box } from '@material-ui/core'

const userReducer = new UserReducer()

interface Props {
	path: string
	component: React.FC
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
	const [state, dispatch] = React.useReducer(userReducer.reducer, { status: 'loading' })

	React.useEffect(() => {
		userReducer.getUser(dispatch)
	}, [])

	return isUser() ? (
		<React.Fragment>
			<UserContextProvider value={{ state, dispatch }}>
				<Container style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}>
					<Card style={{ border: '1px solid bisque', padding: '1em' }}>
						<Grid container>
							<Grid item xs={3} style={{ borderRight: '1px solid bisque' }}>
								<Chat />
							</Grid>
							<Grid item xs={9}>
								<PrimaryAppBar />
								<Route path={props.path} component={props.component} />
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
