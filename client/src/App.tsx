import React from 'react'
import SingIn from './components/auth/SignIn'
import SingUp from './components/auth/SignUp'
import VerifyEmail from './components/auth/VerifyEmail'
import GuestRoute from './helpers/GuestRoute'
import Profile from './components/profile/Profile'
import Search from './components/start/Search'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './helpers/PrivateRoute'

export default function App() {
	return (
		<React.Fragment>
			<Router>
				<Switch>
					{/* <Route path='/' exact component={} /> */}
					<GuestRoute path='/login' component={SingIn} />
					<GuestRoute path='/register' component={SingUp} />
					<GuestRoute path='/verify/:userid/:uuid' component={VerifyEmail} />
					{/* <PrivateRoute path='/profile' component={Profile} /> */}
					<PrivateRoute path='/profile' component={Profile} />
					<PrivateRoute path='/search' component={Search} />
				</Switch>
			</Router>
		</React.Fragment>
	)
}

// function NoMatch() {
// 	return <div>ERROR 404</div>
// }
