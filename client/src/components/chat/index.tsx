import React from 'react'
import { Box, Typography, Avatar } from '@material-ui/core/'
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
			<Box style={{ minHeight: '64px', marginBottom: '1.5em', display: 'flex' }}>
				<Typography variant='h5' style={{ alignSelf: 'center' }}>
					Messages
				</Typography>
			</Box>
			<Box>
				<Box className={cl.chatItem}>
					<Avatar className={cl.chatItemAvatar} alt='Vasya' src='/images/av3.jpg' />
					<Box>
						<Typography className={cl.chatItemName}>Vasya</Typography>
						<Typography className={cl.chatItemTime}>8 minutes ago</Typography>
						<Typography className={cl.chatItemMessage}>how are you?</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Chat
