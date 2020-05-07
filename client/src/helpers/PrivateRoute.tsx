import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isUser } from './getJwt'
import PrimaryAppBar from '../components/layout/PrimaryAppBar'
import UserReducer from '../reducers/UserReducer'
import { Chat } from '../reducers/ChatListReducer'
import { UserContextProvider } from './UserContextProvider'
import { SocketContextProvider } from './SocketContextProvider'
import ChatList from '../components/chat/index'
import ChatBox from '../components/chat/ChatBox'
import { Grid, Card, Container } from '@material-ui/core'

import { SocketManager } from './SocketManager'

import mainStyles from '../styles'

const userReducer = new UserReducer()
const socketManager = new SocketManager()
interface Props {
	path: string
	component: React.FC
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
	const [state, dispatch] = React.useReducer(userReducer.reducer, { status: 'loading' })
	const [chat, setChat] = React.useState<Chat | null>(null)
	const mainClasses = mainStyles()
	React.useEffect(() => {
		userReducer.getUser(dispatch)
	}, [])

	return isUser() ? (
		<React.Fragment>
			<UserContextProvider value={{ state, dispatch }}>
				<SocketContextProvider value={{ socket: socketManager }}>
					<Container style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}>
						<Card style={{ border: '1px solid bisque', paddingLeft: '1em' }}>
							<Grid container style={{ height: 'calc(100vh - 2em)' }}>
								<Grid item xs={3} style={{ borderRight: '1px solid bisque' }}>
									<ChatList setChat={setChat} />
								</Grid>
								<Grid item xs={9} className={mainClasses.rightScrollingContainer}>
									{!chat && <PrimaryAppBar />}
									{chat ? (
										<ChatBox chat={chat} setChat={setChat} />
									) : (
										<div style={{ height: 'calc(100% - 5em)', overflowY: 'scroll' }}>
											<Route path={props.path} component={props.component} />
										</div>
									)}
								</Grid>
							</Grid>
						</Card>
					</Container>
				</SocketContextProvider>
			</UserContextProvider>
		</React.Fragment>
	) : (
		<Redirect to='/login' />
	)
}

export default PrivateRoute
