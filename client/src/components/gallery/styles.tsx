import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			marginTop: '1em',
			marginBottom: '1em',
			padding: '1em',
		},
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			width: '100%',
		},
		image: {
			position: 'relative',
			height: '20em',
			border: '4px double #946556',
			[theme.breakpoints.down('xs')]: {
				width: '100% !important', // Overrides inline-style
				height: '20em',
			},
			'&:hover, &$focusVisible': {
				zIndex: 1,
				'& $imageBackdrop': {
					opacity: 0.15,
				},
				// '& $imageMarked': {
				// 	opacity: 0,
				// },
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
		imageBackdrop: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			backgroundColor: theme.palette.common.black,
			opacity: 0.4,
			transition: theme.transitions.create('opacity'),
		},
		imageTitle: {
			position: 'relative',
			padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
		},
		// imageMarked: {
		// 	height: 3,
		// 	width: 18,
		// 	backgroundColor: theme.palette.common.white,
		// 	position: 'absolute',
		// 	bottom: -2,
		// 	left: 'calc(50% - 9px)',
		// 	transition: theme.transitions.create('opacity'),
		// },
	}),
)

export default styles
