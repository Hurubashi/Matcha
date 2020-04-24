import React from 'react'
import { Box, Typography, Avatar, ButtonBase } from '@material-ui/core/'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

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

type MsgStatus = 'sended' | 'readed' | 'unreaded'
interface ChatItemInfo {
	avatar: string
	name: string
	lastMsgTime: string
	msgText: string
	msgStatus: MsgStatus
}
const chats: ChatItemInfo[] = [
	{
		avatar: '/images/av3.jpg',
		name: 'Vasya',
		lastMsgTime: '8 min ago',
		msgText: 'how are u?',
		msgStatus: 'unreaded',
	},
	{
		avatar: '/images/av1.jpg',
		name: 'Nikolay',
		lastMsgTime: '1 day ago',
		msgText: 'kittens should rule ower humans',
		msgStatus: 'sended',
	},
	{
		avatar: '/images/av2.jpg',
		name: 'Nina',
		lastMsgTime: '2 day ago',
		msgText: 'Byla ya i 2 gruzina',
		msgStatus: 'readed',
	},
]
const Chat: React.FC = () => {
	const cl = styles()
	const [message, setMessage] = React.useState({
		text: '',
	})
	const sendMessage = () => {
		socket.emit('message', message.text)
	}

	return (
		<Box className={cl.chatsList}>
			<Box className={cl.chatListHeader}>
				<Typography variant='h5' style={{ alignSelf: 'center' }}>
					Messages
				</Typography>
			</Box>
			<Box>
				{chats.map((elem) => {
					return (
						<ButtonBase className={cl.chatItem}>
							<Avatar className={cl.chatItemAvatar} alt='Vasya' src={elem.avatar} />
							<Box style={{ overflow: 'hidden' }}>
								<Typography className={cl.chatName}>{elem.name}</Typography>
								<Typography className={cl.chatTime}>{elem.lastMsgTime}</Typography>
								<Box style={{ display: 'flex' }}>
									{elem.msgStatus == 'readed' && <ArrowBackIcon fontSize='small' />}
									{elem.msgStatus == 'unreaded' && <FiberManualRecordIcon fontSize='small' color='error' />}
									<Typography className={cl.chatMessage}>{elem.msgText}</Typography>
								</Box>
							</Box>
						</ButtonBase>
					)
				})}
			</Box>
		</Box>
	)
}

export default Chat
