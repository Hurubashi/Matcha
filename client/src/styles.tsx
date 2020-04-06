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

		// Profile
		profileAvatar: {
			width: `${theme.spacing(3)}em`,
			height: `${theme.spacing(3)}em`,
			[theme.breakpoints.down('xs')]: {
				width: `${theme.spacing(2.2)}em`,
				height: `${theme.spacing(2.2)}em`,
			},
			borderRadius: '50%',
			display: 'block',
			margin: 'auto',
			position: 'relative',
			border: `1px solid ${theme.palette.primary.main}`,
		},
		profileAvatarChange: {
			// height: `${theme.spacing(3) / 2}em`,
			// borderRadius: `0 0 ${theme.spacing(3)}em ${theme.spacing(3)}em`,
			marginTop: `-${theme.spacing(3)}em`,
			[theme.breakpoints.down('xs')]: {
				// height: `${theme.spacing(2.2) / 2}em`,
				// borderRadius: `0 0 ${theme.spacing(2.2)}em ${theme.spacing(2.2)}em`,
				marginTop: `-${theme.spacing(2.2)}em`,
			},
			lineHeight: `${theme.spacing(0.5)}em`,
			display: 'flex',
			backgroundColor: '#33140c',
			color: 'white',
			opacity: 0.5,
			visibility: 'hidden',
			cursor: 'pointer',
		},
		photoLibraryIcon: { fontSize: `${theme.spacing(0.5)}em`, margin: 'auto' },
		profileTextField: {
			marginBottom: '0.7em',
			paddingBottom: '0.4em',
			borderBottom: '1px ridge',
		},
		profileCard: {
			padding: '1em',
		},
		basicInputFieldsContainer: {
			paddingTop: 20,
			alignSelf: 'flex-start',
		},
		chip: {
			marginRight: `${theme.spacing(0.05)}em`,
		},
	}),
)

export default styles
