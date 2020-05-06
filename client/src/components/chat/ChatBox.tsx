import React from 'react'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import SendIcon from '@material-ui/icons/Send'
import CloseIcon from '@material-ui/icons/Close'

import MessagesReducer from '../../reducers/MessagesReducer'
import { Chat } from '../../reducers/ChatListReducer'
import styles from './chatBoxStyles'

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

interface Props {
	chat: Chat
}

const ChatBox: React.FC<Props> = (props: Props) => {
	const classes = styles()
	const { chat } = props
	const [message, setMessage] = React.useState({
		text: '',
	})
	const sendMessage = () => {
		socket.emit('message', message.text)
	}
	const messageReducer = new MessagesReducer()
	const [messageState, messageDispatch] = React.useReducer(messageReducer.reducer, { status: 'loading' })

	React.useEffect(() => {
		messageReducer.getMessages(messageDispatch, props.chat.id)
	}, [])
	return (
		<Card className={classes.chatBox}>
			<Box className={classes.close}>
				<Avatar src={chat.interlocutorAvatar} />
				<Typography variant='h6'>{chat.interlocutorName}</Typography>
				<div style={{ flexGrow: 1 }}></div>
				<IconButton>
					<CloseIcon fontSize='default' />
				</IconButton>
			</Box>
			<Box color='text.primary' className={classes.messageBox}>
				{messageState.status === 'success' &&
					messageState.data.map((elem) => {
						const msgStyle = chat.interlocutorId === elem.id ? classes.leftMessage : classes.rightMessage
						return (
							<div className={`${classes.message} ${msgStyle}`}>
								<Typography className={classes.messageContent}>{elem.message}</Typography>
							</div>
						)
					})}
			</Box>

			<TextField
				placeholder='Enter your message'
				className={classes.messageInput}
				multiline={true}
				variant='outlined'
				rowsMax='4'
				value={message.text}
				onChange={(e) => setMessage({ text: e.target.value })}
				InputProps={{
					endAdornment: (
						<IconButton onClick={sendMessage}>
							<SendIcon />
						</IconButton>
					),
				}}
			/>
		</Card>
	)
}

export default ChatBox
