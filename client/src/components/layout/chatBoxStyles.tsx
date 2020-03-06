import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const chatBoxWidth = '55vw'
const messageInputHeight = '15vh'

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
       },
       close: {
         padding: 5,
         display: 'flex',
         justifyContent: 'flex-end'
       },
       message: {
         position: 'relative',
         marginBottom: '10px',
         padding: '10px',
         textAlign: 'left',
         font: "400 .9em 'Open Sans', sans-serif",
         borderRadius: '10px',
       },
       leftMessage: {
         marginRight: '20px',
         backgroundColor: '#A8DDFD',
         border: '1px solid #97C6E3',
       },
       rightMessage: {
         marginLeft: '20px',
         backgroundColor: '#f8e896',
         border: '1px solid #dfd087',
       },
       messageContent: {
         padding: '0',
         margin: '0',
     },
     messageInput: {
       position: 'relative',
       padding: 10,
       minWidth: `calc(${chatBoxWidth} - 3vw)`,
       font: "400 .9em 'Open Sans', sans-serif",
     },
     sendButton: {
       padding: 0
     }
 }),
)

export default styles
