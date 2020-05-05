import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isUser } from './getJwt'
import PrimaryAppBar from '../components/layout/PrimaryAppBar'
import UserReducer from '../reducers/UserReducer'
import { UserContextProvider } from './UserContextProvider'
import ChatList from '../components/chat/index'
import Chat from '../components/chat/ChatBox'
import { Grid, Card, Container } from '@material-ui/core'
import mainStyles from '../styles'

const userReducer = new UserReducer()

interface Props {
	path: string
	component: React.FC
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
	const [state, dispatch] = React.useReducer(userReducer.reducer, { status: 'loading' })
	const [chat, chatDispatch] = React.useState<boolean>(false)
	const mainClasses = mainStyles()
	React.useEffect(() => {
		userReducer.getUser(dispatch)
	}, [])

	return isUser() ? (
		<React.Fragment>
			<UserContextProvider value={{ state, dispatch }}>
				<Container style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}>
					<Card style={{ border: '1px solid bisque', paddingLeft: '1em' }}>
						<Grid container>
							<Grid item xs={3} style={{ borderRight: '1px solid bisque' }}>
								<ChatList />
							</Grid>
							<Grid item xs={9}>
								<PrimaryAppBar />
								<div className={mainClasses.rightScrollingContainer}>
									{/* <Route path={props.path} component={props.component} /> */}
									<Chat />
								</div>
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
