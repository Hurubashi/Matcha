import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			marginTop: '1em',
			marginBottom: '1em',
			padding: '1em',
			[theme.breakpoints.down('xs')]: {
				marginTop: '0.5em',
				marginBottom: '0.5em',
				padding: '0.5em',
			},
		},
		imagesContainer: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			width: '100%',
		},
		centered: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			msTransform: 'translateY(-50%)',
			transform: 'translateX(-50%) translateY(-50%)',
			width: 'fit-content',
			height: 'fit-content',
		},
		image: {
			display: 'inline-block',
			fontSize: '12px',
			position: 'relative',
			height: '20em',
			border: `1px groove ${theme.palette.primary.main}`,
			margin: '1.16%',
			width: '31%',
			[theme.breakpoints.down('xs')]: {
				height: '10em',
				'& $imageBackdrop': {
					opacity: 0.25,
				},
				'& $thumbUp': {
					visibility: 'visible',
				},
				'& $edit': {
					visibility: 'visible',
				},
			},
			'&:hover': {
				'& $imageBackdrop': {
					opacity: 0.25,
				},
				'& $thumbUp': {
					visibility: 'visible',
				},
				'& $edit': {
					visibility: 'visible',
				},
			},
		},
		imageBackdrop: {
			opacity: 0,
			backgroundColor: 'black',
		},
		imageButton: {
			position: 'absolute',
			right: 0,
			top: 0,
			bottom: 0,
			display: 'flex',
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
		thumbUp: {
			right: '1em',
			bottom: '1em',
			[theme.breakpoints.down('xs')]: {
				right: '0.1em',
				bottom: '0.1em',
			},
		},
		edit: {
			right: '1em',
			top: '1em',
			[theme.breakpoints.down('xs')]: {
				right: '0.1em',
				top: '0.1em',
			},
		},
		iconButton: {
			height: '3em',
			position: 'absolute',
			right: '1em',
			bottom: '1em',
			display: 'flex',
			alignItems: 'center',
			color: 'white',
			visibility: 'hidden',
			[theme.breakpoints.down('xs')]: {
				right: '0.1em',
				bottom: '0.1em',
				visibility: 'hidden',
			},
			'&:hover': {
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
			},
		},
		thumbsCount: {
			margin: '0.1em',
		},
	}),
)

export default styles
