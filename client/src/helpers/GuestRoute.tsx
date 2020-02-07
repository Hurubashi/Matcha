import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getJwt } from './getJwt'

interface Props {
	path: string
	component: React.FC | React.ComponentType
}
const GuestRoute: React.FC<Props> = (props: Props) => {
	const token = getJwt()

	return token ? (
		<Redirect to='/profile' />
	) : (
		<Route path={props.path} component={props.component} />
	)
}

export default GuestRoute
