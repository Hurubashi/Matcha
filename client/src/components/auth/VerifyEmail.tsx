import React from 'react'
import { useParams } from 'react-router-dom'

import { Container, Button, Box } from '@material-ui/core/'
import axios from 'axios'

interface RouteParams {
	userid: string | undefined
	uuid: string | undefined
}

const VerifyEmail: React.FC = () => {
	const params = useParams<RouteParams>()

	let verifyEmail = () => {
		axios
			.get('/api/auth/verify/' + params.userid + '/' + params.uuid)
			.then(function(res) {
				console.log(params.userid)
				if (res['data']['success'] === true) {
				}
			})
			.catch(function(error) {
				if (error.response['data']['success'] === false) {
					console.log(error.response['data']['msg'])
					console.log(error.response.status)
				}
			})
	}

	return (
		<Container maxWidth='lg'>
			<Box display='flex' justifyContent='center' marginTop='0.5em'>
				<Button variant='contained' color='secondary' onClick={verifyEmail}>
					Secondary
				</Button>
			</Box>
		</Container>
	)
}

export default VerifyEmail
