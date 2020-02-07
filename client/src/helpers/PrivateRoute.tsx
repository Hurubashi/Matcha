import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getJwt } from './getJwt'

interface Props {
	path: string
	component: React.FC
}
const PrivateRoute: React.FC<Props> = (props: Props) => {
	const token = getJwt()

	return token ? <Route path={props.path} component={props.component} /> : <Redirect to='/login' />
}

export default PrivateRoute
