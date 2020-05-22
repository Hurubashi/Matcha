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
		menuList: {
			padding: 0,
		},
		iconButton: {
			borderRadius: '0.1em',
			padding: '1em',
			width: '100%',
			justifyContent: 'start',
		},
		link: {
			textDecoration: 'none',
			color: theme.palette.text.primary,
		},
	}),
)

export default styles
