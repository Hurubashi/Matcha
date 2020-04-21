import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isUser } from './getJwt'
import PrimaryAppBar from '../components/layout/PrimaryAppBar'
import UserReducer from '../reducers/UserReducer'
import { UserContextProvider } from './UserContextProvider'

interface Props {
	path: string
	component: React.FC
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
	const [state, dispatch] = React.useReducer(UserReducer.reducer, { status: 'loading' })

	return isUser() ? (
		<React.Fragment>
			<UserContextProvider value={[state, dispatch]}>
				<PrimaryAppBar />
				<Route path={props.path} component={props.component} />
			</UserContextProvider>
		</React.Fragment>
	) : (
		<Redirect to='/login' />
	)
}

export default PrivateRoute
