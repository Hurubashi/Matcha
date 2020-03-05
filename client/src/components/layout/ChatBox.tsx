import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import { Close } from '@material-ui/icons'
import SendIcon from '@material-ui/icons/Send'
import styles from './chatBoxStyles'

const useStyles = styles

const ChatBox: React.FC = () => {
	const classes = useStyles()
  
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
            <IconButton aria-label="settings" className={classes.close}>
                <Close/>
            </IconButton>
  
          <div className={`${classes.message} ${classes.leftMessage}`}>
          <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>
          <div className={`${classes.message} ${classes.rightMessage}`}>
            <p className={classes.messageContent}>I agree that your message is awesome!</p>
          </div>

          <TextField placeholder='Enter your message' className={classes.messageInput} multiline={true} variant='outlined'
          rowsMax="4"
          InputProps={{
            endAdornment: (
              <IconButton>
                <SendIcon/>
              </IconButton>
            ),
          }}/>

        </CardContent>
      </Card>
    )
}

export default ChatBox
