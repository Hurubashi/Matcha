import React from 'react'
import SingIn from '../auth/SignIn'
import SingUp from '../auth/SignUp'
import VerifyEmail from '../auth/VerifyEmail'
import GuestRoute from '../../helpers/GuestRoute'
import Profile from '../profile'
import Gallery from '../gallery'
import Search from '../search'
import UserPage from '../userpage'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from '../../helpers/PrivateRoute'

export default function App() {
	return (
		<React.Fragment>
			<Router>
				<Switch>
					<GuestRoute path='/login' component={SingIn} />
					<GuestRoute path='/register' component={SingUp} />
					<GuestRoute path='/verify/:userid/:uuid' component={VerifyEmail} />
					<PrivateRoute path='/profile' component={Profile} />
					<PrivateRoute path='/search' component={Search} />
					<PrivateRoute path='/gallery' component={Gallery} />
					<PrivateRoute path='/:user' component={UserPage} />
				</Switch>
			</Router>
		</React.Fragment>
	)
}
