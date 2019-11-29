import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import Button from '@material-ui/core/Button'

import { WithStyles, withStyles, Box } from '@material-ui/core'
import styles from '../../styles'

export interface Props extends WithStyles<typeof styles> {
  signIn: () => void
  signUp: () => void
  // handleChange: (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   key: keyof Values
  // ) => void
  // values: Values
}

const SignIn = withStyles(styles)(
  class extends React.Component<Props> {
    constructor(props: Props) {
      super(props)
    }
    render() {
      const { classes, signUp, signIn } = this.props
      return (
        <React.Fragment>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: '200px' }}
          >
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

export default SignIn
