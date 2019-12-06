import React from 'react'
import SingIn from './components/auth/SignIn'
import SingUp from './components/auth/SignUp'
import ProfileComponent from './components/Profile'
import PrivateRoute from './helpers/PrivateRoute'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrimaryAppBar from './components/layout/PrimaryAppBar'

export default function App() {
  return (
    <React.Fragment>
      <PrimaryAppBar />
      <Router>
        <Switch>
          {/* <Route path='/' exact component={} /> */}
          <Route path='/login' component={SingIn} />
          <Route path='/register' component={SingUp} />
          <PrivateRoute path='/profile' component={ProfileComponent} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}
