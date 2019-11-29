import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { WithStyles, withStyles, Box } from '@material-ui/core'

import { Formik, Form } from 'formik'
import styles from '../../styles'

export interface Values {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
}
export interface Props extends WithStyles<typeof styles> {
  signIn: () => void
  signUp: () => void
  // handleChange: (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   key: keyof Values
  // ) => void
  // values: Values
}

const SignUp = withStyles(styles)(
  class SignUp extends React.Component<Props> {
    values: Values = {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: ''
    }
    constructor(props: Props) {
      super(props)
    }
    onSubmit(values: Values) {}
    render() {
      const { classes, signUp, signIn } = this.props
      return (
        // <Formik initialValues={this.values} onSubmit={values => {
        //   this.onSubmit(values);
        // }}>

        // </Formik>
        <React.Fragment>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: '200px' }}
          >
            <TextField label="Email" />
            <br />

            <Box display="flex">
              <Button
                className={classes.marginSmall}
                children="Sign Up"
                variant="contained"
                onClick={signUp}
              />
              <Button
                className={classes.marginSmall}
                children="Sign In"
                variant="contained"
                onClick={signIn}
              />
            </Box>
          </Grid>
        </React.Fragment>
      )
    }
  }
)

export default SignUp
