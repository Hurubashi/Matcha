import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
	createStyles({
		chatBox: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 2,
		},
		messageBox: {
			overflowY: 'scroll',
			paddingLeft: 20,
			paddingRight: 20,
			height: 'calc(100% - 13em)',
		},
		close: {
			display: 'flex',
			padding: '0.8em',
			borderBottom: '1px solid #c4c4c480',
			marginBottom: '1em',
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
			backgroundColor: '#24232a',
		},
		rightMessage: {
			marginLeft: '20px',
			backgroundColor: '#e92d41',
		},
		messageContent: {
			padding: '0',
			margin: '0',
		},
		messageInput: {
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			padding: 10,
			font: "400 .9em 'Open Sans', sans-serif",
		},
	}),
)

export default styles
