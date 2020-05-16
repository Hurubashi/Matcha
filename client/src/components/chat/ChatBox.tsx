import React from 'react'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import SendIcon from '@material-ui/icons/Send'
import CloseIcon from '@material-ui/icons/Close'

import MessagesReducer, { Message } from '../../reducers/MessagesReducer'
import { SocketManager } from '../../helpers/SocketManager'
import { Chat } from '../../reducers/ChatListReducer'
import styles from './chatBoxStyles'

interface Props {
	chat: Chat
	setChat: React.Dispatch<React.SetStateAction<Chat | null>>
	socketManager: SocketManager
}

const messageReducer = new MessagesReducer()

const ChatBox: React.FC<Props> = (props: Props) => {
	const classes = styles()
	const { chat, setChat, socketManager } = props
	const [newMessage, setNewMessage] = React.useState('')
	const messagesEndRef = React.useRef<HTMLDivElement>(null)
	const [messageState, messageDispatch] = React.useReducer(messageReducer.reducer, { status: 'loading' })

	const scrollToBottom = (smooth: boolean) => {
		if (messagesEndRef && messagesEndRef.current) {
			if (smooth) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
			else messagesEndRef.current.scrollIntoView()
		}
	}

	React.useEffect(() => {
		messageReducer.getMessages(messageDispatch, chat.id, () => {
			scrollToBottom(false)
		})

		socketManager.socket.on('messageSent', (data: any) => {
			setNewMessage('')
			messageDispatch({ type: 'success', results: data })
			scrollToBottom(true)
		})
		socketManager.socket.on('message', (data: any) => {
			if (messageState.status === 'success') messageDispatch({ type: 'success', results: data })
			scrollToBottom(true)
		})

		return () => {
			socketManager.socket.removeListener('message')
			socketManager.socket.removeListener('messageSent')
		}
	}, [chat])

	const sendMsg = () => {
		const res = newMessage.replace(/(\r\n|\n|\r)/gm, '')
		setNewMessage(res)
		if (res.length > 0) socketManager.sendMessage({ chatId: chat.id, receiverId: chat.interlocutorId, text: res })
	}

	const runFuncOnEnter = (func: () => void) => (e: React.KeyboardEvent) => {
		if (e.keyCode === 13) {
			func()
		}
	}

	return (
		<Card className={classes.chatBox}>
			{messageState.status === 'success' && (
				<Box className={classes.close}>
					<Avatar src={chat.interlocutorAvatar} style={{ width: '3em', height: '3em' }} />
					<Typography variant='h6' style={{ padding: '0.5em' }}>
						{chat.interlocutorName}
					</Typography>
					<div style={{ flexGrow: 1 }}></div>
					<IconButton style={{ width: '2em', height: '2em' }} onClick={() => setChat(null)}>
						<CloseIcon fontSize='default' />
					</IconButton>
				</Box>
			)}
			<Box color='text.primary' className={classes.messageBox}>
				{messageState.status === 'success' &&
					messageState.data.map((elem, idx) => {
						const msgStyle = chat.interlocutorId === elem.senderId ? classes.leftMessage : classes.rightMessage
						return (
							<div className={`${classes.message} ${msgStyle}`} key={'msg' + idx}>
								<Typography className={classes.messageContent}>{elem.message}</Typography>
							</div>
						)
					})}
				<div ref={messagesEndRef} />
			</Box>
			<TextField
				placeholder='Enter your message'
				className={classes.messageInput}
				multiline={true}
				variant='outlined'
				rowsMax='4'
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
				onKeyDown={runFuncOnEnter(sendMsg)}
				InputProps={{
					endAdornment: (
						<IconButton onClick={sendMsg}>
							<SendIcon />
						</IconButton>
					),
				}}
			/>
		</Card>
	)
}

export default ChatBox
