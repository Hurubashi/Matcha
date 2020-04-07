import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const chatBoxWidth = '55vw'

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      right: '5px',
      bottom: '5px',
      width: chatBoxWidth,
      height: '50vh',
      minWidth: 320,
      minHeight: 320,
      zIndex: 2,
      display: 'grid'
    },
    messageBox: {
      overflowY: 'scroll',
      paddingLeft: 20,
      paddingRight: 20,
      minHeight: '31vh'
    },
    close: {
      padding: 5,
      height: 40,
      marginBottom: 10,
      textAlign: 'end',
      borderBottom: '1px solid #c4c4c480'
    },
    message: {
      position: 'relative',
      marginBottom: '10px',
      padding: '10px',
      textAlign: 'left',
      font: "400 .9em 'Open Sans', sans-serif",
      borderRadius: '10px'
    },
    leftMessage: {
      marginRight: '20px',
      backgroundColor: '#e7f5fd'
    },
    rightMessage: {
      marginLeft: '20px',
      backgroundColor: '#fe5d261a'
    },
    messageContent: {
      padding: '0',
      margin: '0'
    },
    messageInput: {
      position: 'relative',
      padding: 10,
      minWidth: `calc(${chatBoxWidth} - 3vw)`,
      font: "400 .9em 'Open Sans', sans-serif"
    },
    sendButton: {
      padding: 0
    }
  })
)

export default styles
