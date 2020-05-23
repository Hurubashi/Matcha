import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
	createStyles({
		chatsList: { paddingLeft: '1em', minWidth: '18em' },
		chatListHeader: { position: 'static', minHeight: '64px', marginBottom: '1.5em', display: 'flex' },
		chatItem: {
			display: 'flex',
			textAlign: 'left',
			justifyContent: 'flex-start',
			width: '100%',
			marginBottom: '1.5em',
		},
		chatItemAvatar: {
			width: '3.5em',
			height: '3.5em',
			marginRight: '0.5em',
		},
		chatName: { fontSize: '1rem' },
		chatTime: { color: '#94929c', fontSize: '0.7rem' },
		chatMessage: {
			fontSize: '0.8rem',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			marginLeft: '0.2em',
		},
	}),
)

export default styles
