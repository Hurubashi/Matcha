import React from 'react'
import { Route } from 'react-router-dom'
import PrimaryAppBar from '../layout/PrimaryAppBar'
import UserReducer from '../../reducers/UserReducer'
import { Chat } from '../../reducers/ChatListReducer'
import { UserContextProvider } from '../../helpers/UserContextProvider'
import ChatList from '../chat/index'
import ChatBox from '../chat/ChatBox'
import { Grid, Card, Container, Hidden, SwipeableDrawer } from '@material-ui/core'

import { SocketManager } from '../../helpers/SocketManager'
import ChatListReducer from '../../reducers/ChatListReducer'

import mainStyles from '../../styles'

const userReducer = new UserReducer()
const socketManager = new SocketManager()
const chatListReducer = new ChatListReducer()

interface Props {
	path: string
	component: React.FC
}

const PrivateLayout: React.FC<Props> = (props: Props) => {
	const [state, dispatch] = React.useReducer(userReducer.reducer, { status: 'loading' })
	const [chat, setChat] = React.useState<Chat | null>(null)
	const [mobileChatlist, setMobileChatlist] = React.useState<boolean>(false)
	const [chatListState, chatListDispatch] = React.useReducer(chatListReducer.reducer, { status: 'loading' })

	const mainClasses = mainStyles()
	React.useEffect(() => {
		userReducer.getUser(dispatch)
		chatListReducer.getChats(chatListDispatch, () => {
			socketManager.socket.on('chatlist', (data: any) => {
				chatListReducer.getChats(chatListDispatch, () => {})
			})
		})

		return () => {
			socketManager.socket.removeListener('chatlist')
		}
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
									<ChatList setChat={setChat} chatListState={chatListState} />
								</Grid>
							</Hidden>
							<Hidden mdUp>
								<SwipeableDrawer
									anchor={'left'}
									open={mobileChatlist}
									onClose={() => setMobileChatlist(false)}
									onOpen={() => setMobileChatlist(true)}>
									<ChatList setChat={setChat} chatListState={chatListState} />
								</SwipeableDrawer>
							</Hidden>
							<Route path={props.path}>
								<Grid item xs={12} md={9} className={mainClasses.rightScrollingContainer}>
									<PrimaryAppBar setMobileChatlist={setMobileChatlist} />
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
