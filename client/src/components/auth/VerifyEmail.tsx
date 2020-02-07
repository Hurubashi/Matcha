import React from 'react'
import { useParams } from 'react-router-dom'

import { Container } from '@material-ui/core'

interface RouteParams {
	userid: string | undefined
	uuid: string | undefined
}

const VerifyEmail: React.FC = () => {
	const params = useParams<RouteParams>()
	// let { userid, uuid } = useParams()
	// console.log('param: ' + params)
	return <Container> dd {params.uuid}</Container>
}

export default VerifyEmail
