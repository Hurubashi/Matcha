import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isUser } from './getJwt'
import PrivateLayout from '../components/app/UserLayout'

interface Props {
	path: string
	component: React.FC
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
	return isUser() ? (
		<Route path={props.path} component={() => <PrivateLayout component={props.component} />} />
	) : (
		<Redirect to='/login' />
	)
}

export default PrivateRoute
