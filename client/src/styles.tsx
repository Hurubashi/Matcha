import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme: Theme) =>
  createStyles({
    h1: {
      marginTop: '0.5em',
      fontWeight: 400,
      fontSize: '3.5em'
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
      marginTop: '2em'
    },

    // Profile
    profileAvatar: {
      minWidth: theme.spacing(40),
      minHeight: theme.spacing(40),
      [theme.breakpoints.down('md')]: {
        minWidth: theme.spacing(30),
        minHeight: theme.spacing(30)
      },
      margin: 'auto'
    },
    profileCard: {
      padding: 20
    },
    rightButton: {
      width: 150
    },
    basicInputFieldsContainer: {
      paddingTop: 20,
      alignSelf: 'flex-start'
    },
    marginBottom10: {
      marginBottom: 10
    },
    padding10: {
      padding: 10
    },
    chip: {
      margin: theme.spacing(0.5)
    }
  })
)

export default styles
