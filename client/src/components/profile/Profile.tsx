import React from 'react'
import {
  Box,
  Container,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  Avatar,
  Card,
  Button,
  Typography,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  DialogActions
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import styles from '../../styles'

const useStyles = styles

const fields = [
  {
    name: 'Username',
    value: 'Huru'
  },
  {
    name: 'Email',
    value: 'hurubashi@gmail.com'
  },
  {
    name: 'First Name',
    value: 'John'
  },
  {
    name: 'Second Name',
    value: 'Doe'
  }
]

type Gender = 'Male' | 'Female' | 'Not specified'
type Preferences = 'Male' | 'Female' | 'Male & Female' | 'Not specified'

interface ProfileData {
  username: string
  email: string
  firstName: string
  secondName: string
  gender: Gender
  preferences: Preferences
  interests: string[]
  biography: string
}

const Profile: React.FC = () => {
  const classes = useStyles()

  const profile: ProfileData = {
    username: 'string',
    email: 'string',
    firstName: 'string',
    secondName: 'string',
    gender: 'Male',
    preferences: 'Female',
    interests: ['ss', 'sss'],
    biography: 'string'
  }
  const [editable, setEditable] = React.useState<boolean>(false)
  const [interestsDialog, setInterestsDialog] = React.useState<boolean>(false)
  const [gender, setGender] = React.useState<Gender>('Male')
  const [preferences, setPreferences] = React.useState<Preferences>(
    'Not specified'
  )
  const [chipData, setChipData] = React.useState<string[]>([
    'Angular',
    'jQuery',
    'Polymer',
    'React'
  ])

  const interestsDialogOpen = () => {
    setInterestsDialog(true)
  }
  const interestsDialogClose = () => {
    setInterestsDialog(false)
  }

  const changeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value
    if (val === 'Male' || val === 'Female') {
      setGender(val)
    }
  }

  const changePreferences = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value
    if (val === 'Male' || val === 'Female' || val === 'Male & Female') {
      setPreferences(val)
    }
  }

  const changeEditable = () => {
    setEditable(!editable)
  }

  const handleDelete = (chipToDelete: string) => () => {
    setChipData(chips => chips.filter(chip => chip !== chipToDelete))
  }

  return (
    <Container maxWidth='md'>
      <Card className={classes.profileCard}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Avatar
              className={classes.profileAvatar}
              alt='User Name'
              src='/images/1.jpg'
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            className={classes.basicInputFieldsContainer}
          >
            {editable
              ? fields.map(elem => {
                  return (
                    <TextField
                      label={elem.name}
                      value={elem.value}
                      key={elem.name}
                      fullWidth={true}
                      margin='dense'
                    />
                  )
                })
              : fields.map(elem => {
                  return (
                    <Typography
                      align='left'
                      className={classes.marginBottom10}
                      key={elem.name}
                    >
                      {elem.name}: {elem.value}
                    </Typography>
                  )
                })}

            {editable ? (
              <Box>
                <Box>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Choose your Gender</FormLabel>
                    <RadioGroup
                      aria-label='position'
                      name='position'
                      value={gender}
                      onChange={changeGender}
                      row
                    >
                      <FormControlLabel
                        value='Male'
                        control={<Radio color='primary' />}
                        label='Male'
                        labelPlacement='start'
                      />
                      <FormControlLabel
                        value='Female'
                        control={<Radio color='primary' />}
                        label='Female'
                        labelPlacement='start'
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>
                      Your sexual preference
                    </FormLabel>
                    <RadioGroup
                      aria-label='position'
                      row
                      value={preferences}
                      onChange={changePreferences}
                    >
                      <FormControlLabel
                        value='Male'
                        control={<Radio color='primary' />}
                        label='Male'
                        labelPlacement='start'
                      />
                      <FormControlLabel
                        value='Female'
                        control={<Radio color='primary' />}
                        label='Female'
                        labelPlacement='start'
                      />
                      <FormControlLabel
                        value='Male and Female'
                        control={<Radio color='primary' />}
                        label='Male and Female'
                        labelPlacement='start'
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            ) : (
              <Box textAlign='left'>
                <Typography className={classes.marginBottom10}>
                  {'Gender'}: {gender}
                </Typography>
                <Typography className={classes.marginBottom10}>
                  {'Sexual preferences'}: {preferences}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        <Box p={1}>
          {editable ? (
            <Box>
              <Typography>{'Interests'}:</Typography>
              {chipData.map(data => {
                return (
                  <Chip
                    key={data}
                    label={data}
                    className={classes.chip}
                    onDelete={handleDelete(data)}
                  />
                )
              })}
              <Chip
                icon={<AddCircleOutlineIcon />}
                label={'New'}
                clickable={true}
                onClick={interestsDialogOpen}
              />
              <TextField
                fullWidth={true}
                id='outlined-multiline-static'
                label='Biography'
                multiline
                rows='8'
                variant='outlined'
              />
            </Box>
          ) : (
            <Box textAlign='left' m={1}>
              <Typography>{'Interests'}:</Typography>
              {chipData.map(data => {
                return (
                  <Chip
                    key={data}
                    label={data}
                    className={classes.chip}
                    variant='outlined'
                  />
                )
              })}
              <Typography>{'Biography'}:</Typography>
              <Typography>
                {
                  '"John Doe" (for males) and "Jane Doe" (for females) are multiple-use names that are used when the true name of a person is unknown or is being intentionally concealed. In the context of law enforcement in the United States, such names are often used to refer to a corpse whose identity is unknown or unconfirmed. Secondly, such names are also often used to refer to a hypothetical "everyman" in other contexts, in a manner similar to "John Q. Public" or "Joe Public". There are many variants to the above names, including "John Roe", "Richard Roe", "Jane Roe" and "Baby Doe", "Janie Doe" or "Johnny Doe" (for children).'
                }
              </Typography>
            </Box>
          )}
        </Box>

        <Box textAlign='center'>
          <Button
            className={classes.rightButton}
            onClick={changeEditable}
            variant='outlined'
          >
            {editable ? 'Save' : 'Edit'}
          </Button>
        </Box>

        <Dialog
          onClose={interestsDialogClose}
          aria-labelledby='customized-dialog-title'
          open={interestsDialog}
        >
          <DialogContent dividers>
            <TextField
              id='outlined-search'
              label='Search field'
              type='search'
              variant='outlined'
              fullWidth={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>#</InputAdornment>
                )
              }}
            />
          </DialogContent>

          <Box textAlign='center' m={1}>
            <Button autoFocus variant='outlined'>
              Add
            </Button>
          </Box>
        </Dialog>
      </Card>
    </Container>
  )
}

export default Profile
