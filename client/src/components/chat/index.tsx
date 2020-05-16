import React from 'react'
import { Box, Typography, Avatar, ButtonBase } from '@material-ui/core/'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import ChatListReducer, { Chat } from '../../reducers/ChatListReducer'
import styles from './chatsListStyles'
import { SocketContextConsumer } from '../../helpers/SocketContextProvider'
import { SocketManager } from '../../helpers/SocketManager'

interface Props {
	setChat: React.Dispatch<React.SetStateAction<Chat | null>>
	socketManager: SocketManager
}

const ChatList: React.FC<Props> = (props: Props) => {
	const chatListReducer = new ChatListReducer()
	const cl = styles()
	const { setChat, socketManager } = props

	const [chatListState, chatListDispatch] = React.useReducer(chatListReducer.reducer, { status: 'loading' })

	React.useEffect(() => {
		console.log('useEffect /chat')
		chatListReducer.getChats(chatListDispatch, () => {
			socketManager.socket.on('chatlist', (data: any) => {
				chatListReducer.getChats(chatListDispatch, () => {})
			})
		})

		return () => {
			socketManager.socket.removeListener('chatlist')
		}
	}, [])

	return chatListState.status === 'success' ? (
		// <SocketContextConsumer>
		<Box className={cl.chatsList}>
			<Box className={cl.chatListHeader}>
				<Typography variant='h5' style={{ alignSelf: 'center' }}>
					Messages
				</Typography>
			</Box>
			<Box>
				{chatListState.data.map((chat, idx) => {
					return (
						<ButtonBase className={cl.chatItem} key={idx} onClick={() => setChat(chat)}>
							<Avatar className={cl.chatItemAvatar} alt='Vasya' src={chat.interlocutorAvatar} />
							<Box style={{ overflow: 'hidden' }}>
								<Typography className={cl.chatName}>{chat.interlocutorName}</Typography>
								<Typography className={cl.chatTime}>
									{chat.lastMsg?.time ? new Date(chat.lastMsg.time).toLocaleString() : ''}
								</Typography>
								<Box style={{ display: 'flex' }}>
									{chat.interlocutorId === chat.lastMsg?.senderId && <ArrowBackIcon fontSize='small' />}
									{/* {chat.msgStatus === 'unreaded' && <FiberManualRecordIcon fontSize='small' color='error' />} */}
									<Typography className={cl.chatMessage}>{chat.lastMsg?.text || 'No messages'}</Typography>
								</Box>
							</Box>
						</ButtonBase>
					)
				})}
			</Box>
		</Box>
	) : (
		// </SocketContextConsumer>
		<div>loading...</div>
	)
}

export default ChatList
