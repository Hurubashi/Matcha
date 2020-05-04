import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			width: '100%',
			marginTop: 0,
		},
		image: {
			position: 'relative',
			height: 200,
			width: '31%',
			margin: '1.16%',
			[theme.breakpoints.down('xs')]: {
				width: '100% !important', // Overrides inline-style
				height: 100,
			},
		},
		focusVisible: {},
		imageButton: {
			position: 'absolute',
			// left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			display: 'flex',
			// alignItems: 'center',
			// justifyContent: 'center',
			color: theme.palette.common.white,
		},
		imageSrc: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			backgroundSize: 'cover',
			backgroundPosition: 'center 40%',
		},
		imageTitle: {
			position: 'relative',
			padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1) + 6}px`,
			fontWeight: 'bold',
		},
		searchFiltersContainer: {
			position: 'sticky',
			top: 0,
			left: 0,
			right: 0,
			backgroundColor: theme.palette.background.default,
			// padding: '0.5em',
			// height: '5em',
			zIndex: 1,
		},
	}),
)

export default styles
