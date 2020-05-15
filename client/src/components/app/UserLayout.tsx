import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PrimaryAppBar from '../layout/PrimaryAppBar'
import UserReducer from '../../reducers/UserReducer'
import { Chat } from '../../reducers/ChatListReducer'
import { UserContextProvider } from '../../helpers/UserContextProvider'
import { SocketContextProvider } from '../../helpers/SocketContextProvider'
import ChatList from '../chat/index'
import ChatBox from '../chat/ChatBox'
import { Grid, Card, Container } from '@material-ui/core'

import { SocketManager } from '../../helpers/SocketManager'

import mainStyles from '../../styles'

const userReducer = new UserReducer()
const socketManager = new SocketManager()
interface Props {
	component: React.FC
}

const PrivateLayout: React.FC<Props> = (props: Props) => {
	const [state, dispatch] = React.useReducer(userReducer.reducer, { status: 'loading' })
	const [chat, setChat] = React.useState<Chat | null>(null)
	const mainClasses = mainStyles()
	React.useEffect(() => {
		console.log('private route useEffect')
		userReducer.getUser(dispatch)
	}, [])

	return (
		<React.Fragment>
			<UserContextProvider value={{ state, dispatch }}>
				<SocketContextProvider value={{ socket: socketManager }}>
					<Container style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}>
						<Card style={{ border: '1px solid bisque', paddingLeft: '1em' }}>
							<Grid container style={{ height: 'calc(100vh - 2em)' }}>
								<Grid item xs={3} style={{ borderRight: '1px solid bisque' }}>
									<ChatList setChat={setChat} />
								</Grid>

								<Route>
									<Grid item xs={9} className={mainClasses.rightScrollingContainer}>
										{!chat && <PrimaryAppBar />}
										{chat ? <ChatBox chat={chat} setChat={setChat} /> : ''}
										<div style={{ height: 'calc(100% - 5em)', overflowY: 'scroll' }}>
											<props.component />
										</div>
									</Grid>
								</Route>
							</Grid>
						</Card>
					</Container>
				</SocketContextProvider>
			</UserContextProvider>
		</React.Fragment>
	)
}

export default PrivateLayout
