import React from 'react'
import SingIn from './components/auth/SignIn'
import SingUp from './components/auth/SignUp'
import VerifyEmail from './components/auth/VerifyEmail'
import GuestRoute from './helpers/GuestRoute'
import Profile from './components/profile/Profile'
import Search from './components/start/Search'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrimaryAppBar from './components/layout/PrimaryAppBar'
import PrivateRoute from './helpers/PrivateRoute'

export default function App() {
	return (
		<React.Fragment>
			<Router>
				<PrimaryAppBar />

				<Switch>
					{/* <Route path='/' exact component={} /> */}
					<GuestRoute path='/login' component={SingIn} />
					<GuestRoute path='/register' component={SingUp} />
					<GuestRoute path='/verify/:userid/:uuid' component={VerifyEmail} />
					{/* <PrivateRoute path='/profile' component={Profile} /> */}
					<GuestRoute path='/profile' component={Profile} />
					<GuestRoute path='/search' component={Search} />
				</Switch>
			</Router>
		</React.Fragment>
	)
}

// function NoMatch() {
// 	return <div>ERROR 404</div>
// }
