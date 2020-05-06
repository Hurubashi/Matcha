import React from 'react'
import { Box, Typography, Avatar, ButtonBase } from '@material-ui/core/'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import ChatListReducer from '../../reducers/ChatListReducer'
import styles from './chatsListStyles'

import io from 'socket.io-client'
const socket = io('http://localhost:5001')

socket.on('error', function (err: any) {
	console.log('received socket error:')
	console.log(err)
})

socket.on('connect', function () {
	console.log('socket successfuly connected!')
})

socket.on('message', function (data: any) {
	console.log(data)
})
const sendMessage = (message: string) => {
	socket.emit('message', message)
}

const ChatList: React.FC = () => {
	const chatListReducer = new ChatListReducer()
	const cl = styles()
	const [message, setMessage] = React.useState({
		text: '',
	})

	const [chatListState, chatListDispatch] = React.useReducer(chatListReducer.reducer, { status: 'loading' })

	React.useEffect(() => {
		chatListReducer.getImages(chatListDispatch)
	}, [])

	return chatListState.status === 'success' ? (
		<Box className={cl.chatsList}>
			<Box className={cl.chatListHeader}>
				<Typography variant='h5' style={{ alignSelf: 'center' }}>
					Messages
				</Typography>
			</Box>
			<Box>
				{chatListState.data.map((chat, idx) => {
					return (
						<ButtonBase className={cl.chatItem} key={idx}>
							<Avatar className={cl.chatItemAvatar} alt='Vasya' src={chat.interlocutorAvatar} />
							<Box style={{ overflow: 'hidden' }}>
								<Typography className={cl.chatName}>{chat.interlocutorName}</Typography>
								<Typography className={cl.chatTime}>{chat.lastMsg?.time}</Typography>
								<Box style={{ display: 'flex' }}>
									{/* {chat.msgStatus === 'readed' && <ArrowBackIcon fontSize='small' />}
										{chat.msgStatus === 'unreaded' && <FiberManualRecordIcon fontSize='small' color='error' />} */}
									<Typography className={cl.chatMessage}>{chat.lastMsg?.text || 'No messages'}</Typography>
								</Box>
							</Box>
						</ButtonBase>
					)
				})}
			</Box>
		</Box>
	) : (
		<div>loading...</div>
	)
}

export default ChatList
