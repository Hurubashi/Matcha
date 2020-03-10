import React from 'react'
import {
  Box,
  Container,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  TextField,
  Avatar,
  Card,
  Button,
  Typography,
  Paper
} from '@material-ui/core'
import styles from '../../styles'

const useStyles = styles

const fields = [
  {
    name: 'Username',
    value: 'Huru'
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

const Profile: React.FC = () => {
  const classes = useStyles()

  const [gender, setGender] = React.useState<Gender>('Not specified')
  const [editable, setEditable] = React.useState<boolean>(false)

  const changeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value
    if (val === 'Male' || val == 'Female') {
      setGender(val)
    }
  }

  const changeEditable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditable(!editable)
  }

  return (
    <Container maxWidth='md'>
      <Card className={classes.profileCard}>
        <Avatar
          className={classes.profileAvatar}
          alt='User Name'
          src='/images/1.jpg'
        />

        {editable
          ? fields.map(elem => {
              return <TextField label={elem.name} fullWidth={true} />
            })
          : fields.map(elem => {
              return (
                <Typography align='center'>
                  {elem.name}: {elem.value}
                </Typography>
              )
            })}

        {editable ? (
          <Box>
            <Box textAlign='center' m={1}>
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
                    labelPlacement='top'
                  />
                  <FormControlLabel
                    value='Female'
                    control={<Radio color='primary' />}
                    label='Female'
                    labelPlacement='top'
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box textAlign='center' m={1}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Your sexual preference</FormLabel>
                <FormGroup aria-label='position' row>
                  <FormControlLabel
                    value='top'
                    control={<Checkbox color='primary' />}
                    label='Male'
                    labelPlacement='top'
                  />
                  <FormControlLabel
                    value='bottom'
                    control={<Checkbox color='primary' />}
                    label='Female'
                    labelPlacement='top'
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography align='center'>
              {'Gender'}: {gender}
            </Typography>
            <Typography align='center'>
              {'Sexual preferences'}: {gender}
            </Typography>
          </Box>
        )}

        <Box textAlign='center' m={1}>
          <TextField
            // className={classes.text}
            fullWidth={true}
            id='outlined-multiline-static'
            label='Biography'
            multiline
            rows='8'
            variant='outlined'
          />
        </Box>

        <Box textAlign='center' m={1}>
          {/* <Paper className={classes.rightButton} onClick={changeEditable}>
            {editable ? 'Save' : 'Edit'}
          </Paper> */}
        </Box>
      </Card>
    </Container>
  )
}

export default Profile
