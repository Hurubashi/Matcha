import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import * as Yup from 'yup'
import { withFormik, FormikProps, Form } from 'formik'
import axios from 'axios'
import {
  Button,
  Link,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  createStyles,
  makeStyles
} from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import styles from '../../styles'
import TextFieldWithIcon from '../inputs/TextFieldWithIcon'

const useStyles = makeStyles(createStyles(styles))

interface FormValues {
  username: string
  password: string
  remember: boolean
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props
  const classes = useStyles()

  return (
    <React.Fragment>
      <Container maxWidth='sm'>
        <Typography variant='h1' className={classes.h1}>
          {'Sign In'}
        </Typography>
        <Form>
          <TextFieldWithIcon
            label='Username'
            type='text'
            name='username'
            icon={AccountCircleOutlinedIcon}
            handleChange={props.handleChange}
            handleBlur={props.handleBlur}
          />
          {touched.username && errors.username && <div>{errors.username}</div>}
          <TextFieldWithIcon
            label='Password'
            type='password'
            name='password'
            icon={LockOutlinedIcon}
            handleChange={props.handleChange}
            handleBlur={props.handleBlur}
          />
          {touched.password && errors.password && <div>{errors.password}</div>}

          {/** Remember me, ForgotPassword **/}

          <Box display='flex' width='100%' component='span' justifyContent='space-between'>
            <FormControlLabel
              control={
                <Checkbox
                  title='Remember me'
                  color='primary'
                  name='remember'
                  onChange={props.handleChange}
                  defaultChecked={props.values.remember}
                />
              }
              label='Rememeber me'
            />
            <Link
              underline='always'
              component='button'
              type='button'
              variant='body1'
              onClick={() => {
                console.info("I'm a button.")
              }}>
              {'Forgot password?'}
            </Link>
          </Box>

          {/** Log In **/}

          <Button type='submit' variant='contained' fullWidth={true} disabled={isSubmitting}>
            {'Log In'}
          </Button>
        </Form>
        <Box m={1} textAlign='center'>
          <Typography variant='body1'>
            {'New here? '}
            <ReactLink to='/register'>
              <Link component='button' type='button' variant='body1'>
                {'Sign Up'}
              </Link>
            </ReactLink>
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  )
}

const SignIn = withFormik<{}, FormValues>({
  mapPropsToValues: props => {
    return {
      username: '',
      password: '',
      remember: true
    }
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Must be 6 characters or less')
  }),

  handleSubmit: values => {
    console.log(values)
    axios
      .post('/api/auth/login', {
        username: values.username,
        password: values.password
      })
      .then(function(res) {
        console.log('Response received')
        console.log(res)
        localStorage.setItem('jwt', res.data)
      })
      .catch(function(error) {
        console.log('Error catched')
        console.log(error)
      })
  }
})(InnerForm)

export default SignIn
