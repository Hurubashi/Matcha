import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { CookieManager } from './CoookieManager'
import PrimaryAppBar from '../components/layout/PrimaryAppBar'

interface Props {
	path: string
	component: React.FC | React.ComponentType
}
const GuestRoute: React.FC<Props> = (props: Props) => {
	return CookieManager.isAuthorized() ? (
		<Redirect to='/search' />
	) : (
		<React.Fragment>
			<PrimaryAppBar />
			<Route path={props.path} component={props.component} />
		</React.Fragment>
	)
}

export default GuestRoute
