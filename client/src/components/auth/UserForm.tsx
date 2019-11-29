import React, { Component } from 'react'
import { WithStyles, withStyles } from '@material-ui/core'
import { Button, Box } from '@material-ui/core'

import styles from '../../styles'

import MyForm from './MyForm'

export interface State {
  step: 'SignIn' | 'SignUp'
}

// export interface Values {
//   username: string
//   email: string
//   firstName: string
//   lastName: string
//   password: string
//   sex: string
// }

// export interface Props {
//   signIn: () => void
//   signUp: () => void
// handleChange: (
//   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   key: keyof Values
// ) => void
// values: Values
// }

const UserForm = withStyles(styles)(
  class extends Component {
    state: State = {
      step: 'SignIn'
    }

    // values: Values = {
    //   username: '',
    //   email: '',
    //   firstName: '',
    //   lastName: '',
    //   password: '',
    //   sex: ''
    // }

    signIn = () => {
      this.setState({
        step: 'SignIn'
      })
    }

    signUp = () => {
      this.setState({
        step: 'SignUp'
      })
    }

    render() {
      switch (this.state.step) {
        case 'SignIn':
          return <MyForm message='Sing In' signIn={this.signIn} />
        case 'SignUp':
        // return <SignIn signIn={this.signIn} signUp={this.signUp} />
      }
      return <h1>Something went wrong</h1>
    }
  }
)

export default UserForm
