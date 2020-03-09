import React from 'react'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import { Close } from '@material-ui/icons'
import SendIcon from '@material-ui/icons/Send'
import styles from './chatBoxStyles'

import io from 'socket.io-client'
const socket = io('http://localhost:5001')

socket.on('error', function (err: any) {
  console.log('received socket error:')
  console.log(err)
})

socket.on('connect', function () {
  console.log('successfuly connected!')
})

socket.on('message', function (data: any) {
  console.log(data)
})

const useStyles = styles

const ChatBox: React.FC = () => {
  const classes = useStyles()
  const [message, setMessage] = React.useState({
		text: '',
	})
  const sendMessage = () => {
    socket.emit('message', message.text)
  }
  
    return (
      <Card className={classes.root} variant="outlined">
        <Box className={classes.close} >
          <IconButton aria-label="settings" size="small">
            <Close />
          </IconButton>
        </Box>
            <Box color="text.primary" className={classes.messageBox}>
          <div className={`${classes.message} ${classes.leftMessage}`}>
          <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.rightMessage}`}>
            <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.leftMessage}`}>
          <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.rightMessage}`}>
            <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.leftMessage}`}>
          <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.rightMessage}`}>
            <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.leftMessage}`}>
          <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.rightMessage}`}>
            <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.leftMessage}`}>
          <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.rightMessage}`}>
            <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.leftMessage}`}>
          <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.rightMessage}`}>
            <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.leftMessage}`}>
          <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.rightMessage}`}>
            <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.leftMessage}`}>
          <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.rightMessage}`}>
            <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>

          </Box>
          <TextField placeholder='Enter your message' className={classes.messageInput} multiline={true} variant='outlined'
          rowsMax="4"
          value={message.text}
          onChange={e => setMessage({ text: e.target.value })}
          InputProps={{
            endAdornment: (
              <IconButton className={classes.sendButton} onClick={sendMessage}>
                <SendIcon/>
              </IconButton>
            ),
          }}/>
      </Card>
    )
}

export default ChatBox
