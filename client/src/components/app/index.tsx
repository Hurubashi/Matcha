import React from 'react'
import SingIn from '../auth/SignIn'
import SingUp from '../auth/SignUp'
import VerifyEmail from '../auth/VerifyEmail'
import GuestRoute from '../../helpers/GuestRoute'
import Profile from '../profile'
import Gallery from '../gallery'
import Search from '../search'
import UserPage from '../userpage'

import { BrowserRouter as Router, Switch } from 'react-router-dom'
import PrivateRoute from '../../helpers/PrivateRoute'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

import useTheme, { Palette } from '../../theme'

export default function App() {
	const colorTheme: Palette = 'dark'

	const theme = React.useMemo(useTheme(colorTheme), [colorTheme])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					{/* <Route path='/' exact component={SingIn} /> */}
					<GuestRoute path='/login' component={SingIn} />
					<GuestRoute path='/register' component={SingUp} />
					<GuestRoute path='/verify/:userid/:uuid' component={VerifyEmail} />
					<PrivateRoute path='/profile' component={Profile} />
					<PrivateRoute path='/search' component={Search} />
					<PrivateRoute path='/gallery' component={Gallery} />
					<PrivateRoute path='/:user' component={UserPage} />
				</Switch>
			</Router>
		</ThemeProvider>
	)
}

const NoPage: React.FC = () => {
	return <div>404</div>
}
