import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
	createStyles({
		grow: {
			flexGrow: 1,
		},
		toolbar: {
			alignItems: 'flex-start',
		},
		appBar: {
			backgroundColor: theme.palette.background.default,
			boxShadow: 'none',
		},
		title: {
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
			fontFamily: 'Dancing Script',
			fontSize: '34px',
		},
		sectionDesktop: {
			display: 'none',
			[theme.breakpoints.up('md')]: {
				display: 'flex',
			},
		},
		sectionMobile: {
			display: 'flex',
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
		chatButton: {
			position: 'fixed',
			right: '1em',
			bottom: '4em',
			zIndex: 2,
		},
		iconButton: {
			borderRadius: 0,
		},
		link: {
			textDecoration: 'none',
			color: theme.palette.text.primary,
		},
	}),
)

export default styles
