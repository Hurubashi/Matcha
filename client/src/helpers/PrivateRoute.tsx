import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isUser } from './getJwt'
import PrimaryAppBar from '../components/layout/PrimaryAppBar'

interface Props {
	path: string
	component: React.FC
}
const PrivateRoute: React.FC<Props> = (props: Props) => {
	return isUser() ? (
		<React.Fragment>
			<PrimaryAppBar />
			<Route path={props.path} component={props.component} />
		</React.Fragment>
	) : (
		<Redirect to='/login' />
	)
}

export default PrivateRoute
