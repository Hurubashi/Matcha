import React from 'react'
import SingIn from './components/auth/SignIn'
import SingUp from './components/auth/SignUp'
import ProfileComponent from './components/Profile'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './helpers/PrivateRoute'

export default function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path='/' exact component={} /> */}
        <Route path='/login' component={SingIn} />
        <Route path='/register' component={SingUp} />
        <PrivateRoute path='/profile' component={Profile} />
      </Switch>
    </Router>
  )
}

const LogIn = () => <SingIn />
const Registration = () => <SingUp />
const Profile = () => <ProfileComponent />
