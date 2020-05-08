import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
	createStyles({
		marginSm: {
			margin: `${theme.spacing(0.1)}em`,
		},
		paddingSm: {
			padding: `${theme.spacing(0.1)}em`,
		},
		profileAvatar: {
			width: `22em`,
			height: `22em`,
			[theme.breakpoints.down('xs')]: {
				width: `16em`,
				height: `16em`,
				margin: 'none',
			},
			borderRadius: '50%',
			display: 'block',
			margin: 'auto',
			position: 'relative',
			// border: `1px solid ${theme.palette.primary.main}`,
			cursor: 'pointer',
		},
		visibleAvatarChange: {
			'&:hover': {
				'& $profileAvatarChange': {
					visibility: 'visible',
				},
			},
		},
		profileAvatarChange: {
			marginTop: `-22em`,
			[theme.breakpoints.down('xs')]: {
				marginTop: `-16em`,
			},
			lineHeight: `${theme.spacing(0.5)}em`,
			display: 'flex',
			backgroundColor: theme.palette.background.default,
			color: 'white',
			opacity: 0.5,
			visibility: 'hidden',
			marginBottom: '0.5em',
		},
		photoLibraryIcon: { fontSize: `${theme.spacing(0.5)}em`, margin: 'auto' },
		profileTextField: {
			marginBottom: '0.7em',
			paddingBottom: '0.4em',
			borderBottom: '1px solid #28272c',
		},
		profileCard: {
			padding: '1em',
			marginBottom: '2em',
		},
		basicInputFieldsContainer: {
			paddingTop: '1.5em',
			alignSelf: 'flex-start',
		},
		chip: {
			margin: `${theme.spacing(0.05)}em`,
		},
	}),
)

export default styles
