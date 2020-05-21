import React from 'react'
import { Route } from 'react-router-dom'
import PrimaryAppBar from '../layout/PrimaryAppBar'
import UserReducer from '../../reducers/UserReducer'
import { Chat } from '../../reducers/ChatListReducer'
import { UserContextProvider } from '../../helpers/UserContextProvider'
import { SocketContextProvider } from '../../helpers/SocketContextProvider'
import ChatList from '../chat/index'
import ChatBox from '../chat/ChatBox'
import { Grid, Card, Container, Hidden, SwipeableDrawer } from '@material-ui/core'

import { SocketManager } from '../../helpers/SocketManager'

import mainStyles from '../../styles'

const userReducer = new UserReducer()
const socketManager = new SocketManager()
interface Props {
	path: string
	component: React.FC
}

const PrivateLayout: React.FC<Props> = (props: Props) => {
	const [state, dispatch] = React.useReducer(userReducer.reducer, { status: 'loading' })
	const [chat, setChat] = React.useState<Chat | null>(null)
	const [leftPanel, setLeftPanel] = React.useState<boolean>(true)

	const mainClasses = mainStyles()
	React.useEffect(() => {
		userReducer.getUser(dispatch)
	}, [])

	return (
		<React.Fragment>
			<UserContextProvider value={{ state, dispatch }}>
				{/* <SocketContextProvider value={{ socket: socketManager }}> */}
				<Container style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}>
					<Card style={{ border: '1px solid bisque' }}>
						<Grid container style={{ height: 'calc(100vh - 2em)' }}>
							<Hidden smDown>
								<Grid item md={3} style={{ borderRight: '1px solid bisque' }}>
									<ChatList setChat={setChat} socketManager={socketManager} />
								</Grid>
							</Hidden>
							<Hidden mdUp>
								<SwipeableDrawer
									anchor={'left'}
									open={leftPanel}
									onClose={() => setLeftPanel(false)}
									onOpen={() => setLeftPanel(true)}>
									<ChatList setChat={setChat} socketManager={socketManager} />
								</SwipeableDrawer>
							</Hidden>
							<Route path={props.path}>
								<Grid item xs={12} md={9} className={mainClasses.rightScrollingContainer}>
									<PrimaryAppBar />
									{chat ? <ChatBox chat={chat} setChat={setChat} socketManager={socketManager} /> : ''}
									<div style={{ height: 'calc(100% - 5em)', overflowY: 'scroll' }}>
										<props.component />
									</div>
								</Grid>
							</Route>
						</Grid>
					</Card>
				</Container>
				{/* </SocketContextProvider> */}
			</UserContextProvider>
		</React.Fragment>
	)
}

export default PrivateLayout
