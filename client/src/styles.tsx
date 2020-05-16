import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
	createStyles({
		h1: {
			marginTop: '0.5em',
			fontWeight: 400,
			fontSize: '3.5em',
		},
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-around',
			backgroundSize: 'cover',
			backgroundPosition: 'center 40%',
			marginTop: '2em',
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
		rightScrollingContainer: {
			height: 'inherit',
			overflow: 'hidden',
			position: 'relative',
		},
	}),
)

export default styles
