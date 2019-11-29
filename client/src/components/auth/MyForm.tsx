import React from 'react'
import * as Yup from 'yup'
import { withFormik, FormikProps, FormikErrors, Form } from 'formik'
import {
  Button,
  TextField,
  Grid,
  Link,
  Box,
  Checkbox,
  makeStyles,
  createStyles,
  Theme,
  FormControlLabel
} from '@material-ui/core'
import theme from '../../theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    formControl: {
      margin: theme.spacing(3)
    }
  })
)
// Shape of form values
interface FormValues {
  email: string
  password: string
  remember: boolean
}

interface OtherProps {
  message: string
  signIn: () => void
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message, signIn } = props

  //   const [values, setValues] = React.useState({})

  //   const handleChange = (
  //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     setValues(prevValues => ({
  //       ...prevValues,
  //       // we use the name to tell formik which key of `values` to update.
  //       [event.target.name]: event.target.value
  //     }))
  //   }
  const classes = useStyles()

  return (
    <Form>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        style={{ minHeight: '200px' }}>
        <h1>{message}</h1>
        <TextField
          label='Email'
          type='email'
          name='email'
          onChange={props.handleChange}
          fullWidth={true}
        />
        {touched.email && errors.email && <div>{errors.email}</div>}
        <TextField
          label='Password'
          type='password'
          name='password'
          onChange={props.handleChange}
          fullWidth={true}
        />
        {touched.password && errors.password && <div>{errors.password}</div>}
        <Box
          display='flex'
          width='100%'
          component='span'
          m={1}
          justifyContent='space-between'>
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
            component='button'
            type='button'
            variant='body1'
            onClick={() => {
              console.info("I'm a button.")
            }}>
            Button Link
          </Link>
        </Box>

        <Button
          type='submit'
          variant='contained'
          fullWidth={true}
          disabled={isSubmitting}>
          Log In
        </Button>
      </Grid>
    </Form>
  )
}

// The type of props MyForm receives
interface MyFormProps {
  message: string // if this passed all the way through you might do this or make a union type
  signIn: () => void
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      email: '',
      password: 'ssss',
      remember: true
    }
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {},

  handleSubmit: values => {
    // do submitting things
    console.log('Submiting')
    console.log(values)
  }
})(InnerForm)

// Use <MyForm /> wherevs
// const Basic = () => <MyForm message="Sign up" />

export default MyForm
