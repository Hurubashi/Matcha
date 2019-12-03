import React from 'react'
import SingIn from './components/auth/SignIn'
import SingUp from './components/auth/SignUp'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path='/' exact component={} /> */}
        <Route path='/login' component={SingIn} />
        <Route path='/register' component={SingUp} />
      </Switch>
    </Router>
  )
}

const LogIn = () => <SingIn />
const Registration = () => <SingUp />
