import React from 'react'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import SendIcon from '@material-ui/icons/Send'
import CloseIcon from '@material-ui/icons/Close'

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
	chatId: number
}

const ChatBox: React.FC<Props> = (props: Props) => {
	const classes = styles()
	const [message, setMessage] = React.useState({
		text: '',
	})
	const sendMessage = () => {
		socket.emit('message', message.text)
	}

	return (
		<Card className={classes.chatBox}>
			<Box className={classes.close}>
				<Avatar></Avatar>
				<Typography>James Bond</Typography>
				<div style={{ flexGrow: 1 }}></div>
				<IconButton aria-label='settings'>
					<CloseIcon fontSize='default' />
				</IconButton>
			</Box>
			<Box color='text.primary' className={classes.messageBox}>
				<div className={`${classes.message} ${classes.leftMessage}`}>
					<Typography className={classes.messageContent}>I agree that your message is awesome!</Typography>
				</div>
				<div className={`${classes.message} ${classes.rightMessage}`}>
					<Typography className={classes.messageContent}>I agree that your message is awesome!</Typography>
				</div>
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
