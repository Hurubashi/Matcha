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
         minWidth: 275,
         minHeight: 275,
         zIndex: 2,
         paddingTop: '20px'
       },
       close: {
           position: 'absolute',
           top: '2px',
           right: '2px'
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
       position: 'absolute',
       bottom: '2vh',
       minWidth: `calc(${chatBoxWidth} - 3vw)`,
       font: "400 .9em 'Open Sans', sans-serif",
     },
     sendButton: {
       position: 'absolute',
       bottom: '0px'
     }
 }),
)

export default styles
