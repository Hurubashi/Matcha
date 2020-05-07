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
import { SocketContextConsumer } from '../../helpers/SocketContextProvider'
import { Chat } from '../../reducers/ChatListReducer'
import styles from './chatBoxStyles'

interface Props {
	chat: Chat
	setChat: React.Dispatch<React.SetStateAction<Chat | null>>
}

const ChatBox: React.FC<Props> = (props: Props) => {
	const classes = styles()
	const { chat, setChat } = props
	const [message, setMessage] = React.useState('')
	// const sendMessage = () => {
	// 	socket.emit('message', message.text)
	// }

	const messageReducer = new MessagesReducer()
	const [messageState, messageDispatch] = React.useReducer(messageReducer.reducer, { status: 'loading' })

	React.useEffect(() => {
		messageReducer.getMessages(messageDispatch, chat.id)
	}, [chat])
	return (
		<SocketContextConsumer>
			{(ctx) =>
				messageState.status === 'success' &&
				ctx &&
				ctx.socket.socket.on('message', function (data: any) {
					messageDispatch({ type: 'success', results: data })
				}) &&
				ctx.socket.socket.on('messageSent', function (data: any) {
					setMessage('')
					messageDispatch({ type: 'success', results: data })
				}) && (
					<Card className={classes.chatBox}>
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
						<Box color='text.primary' className={classes.messageBox}>
							{messageState.status === 'success' &&
								messageState.data.map((elem) => {
									const msgStyle = chat.interlocutorId === elem.senderId ? classes.leftMessage : classes.rightMessage
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
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							InputProps={{
								endAdornment: (
									<IconButton
										onClick={() =>
											ctx.socket.sendMessage({ chatId: chat.id, receiverId: chat.interlocutorId, text: message })
										}>
										<SendIcon />
									</IconButton>
								),
							}}
						/>
					</Card>
				)
			}
		</SocketContextConsumer>
	)
}

export default ChatBox
