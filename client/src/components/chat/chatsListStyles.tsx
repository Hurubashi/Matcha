import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
	createStyles({
		chatsList: {},
		large: {
			width: theme.spacing(7),
			height: theme.spacing(7),
		},
		chatItem: { display: 'flex' },
		chatItemAvatar: {
			width: '3.5em',
			height: '3.5em',
			marginRight: '0.5em',
		},
		chatItemName: { fontSize: '1rem' },
		chatItemTime: { color: '#94929c', fontSize: '0.7rem' },
		chatItemMessage: { fontSize: '0.8rem' },
	}),
)

export default styles
