import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
	createStyles({
		grow: {
			flexGrow: 1,
		},
		appBar: {
			backgroundColor: theme.palette.background.default,
			boxShadow: 'none',
			zIndex: 2,
		},
		iconButton: {
			borderRadius: '0.1em',
		},
		link: {
			textDecoration: 'none',
			color: theme.palette.text.primary,
		},
	}),
)

export default styles
