import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { CookieManager } from './CoookieManager'
import PrivateLayout from '../components/app/UserLayout'

interface Props {
	path: string
	component: React.FC
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
	return CookieManager.isAuthorized() ? (
		<PrivateLayout component={props.component} path={props.path} />
	) : (
		<Redirect to='/login' />
	)
}

export default PrivateRoute
