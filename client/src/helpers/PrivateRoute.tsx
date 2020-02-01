import React from 'react'
import { Redirect } from 'react-router-dom'
import { getJwt } from './getJwt'

interface Props {
	path: string
	component: React.FC
}
const PrivateRoute: React.FC<Props> = (props: Props) => {
	const token = getJwt()

	return token ? <props.component /> : <Redirect to='/login' />
}

export default PrivateRoute
