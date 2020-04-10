import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
	createStyles({
		marginSm: {
			margin: `${theme.spacing(0.1)}em`,
		},
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
			marginTop: `-${theme.spacing(3)}em`,
			[theme.breakpoints.down('xs')]: {
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