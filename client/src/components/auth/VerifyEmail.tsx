import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'absolute',
		},
		fullWidth: {
			width: '100%',
		},
	}),
)

interface RouteParams {
	userid: string | undefined
	uuid: string | undefined
}

interface Props {
	success: boolean | undefined
	msg: string | undefined
	responded: boolean
}

const VerifyEmail: React.FC = () => {
	const classes = useStyles()

	const params = useParams<RouteParams>()
	const [props, setProps] = useState<Props>({
		success: undefined,
		msg: undefined,
		responded: false,
	})

	if (props.responded === false) {
		axios
			.get('/api/auth/verify/' + params.userid + '/' + params.uuid)
			.then(function(res) {
				console.log(params.userid)
				if (res['data']['success'] === true) {
					setProps({ success: true, msg: 'You email successufully verified.', responded: true })
				}
			})
			.catch(function(error) {
				if (error.response['data'] && error.response['data']['success'] === false) {
					setProps({ success: false, msg: error.response['data']['msg'], responded: true })
				}
			})
	}

	return (
		<Container maxWidth='md'>
			<Box justifyContent='center' marginTop='2.5em' display='flex'>
				{props.success === true && (
					<Alert severity='success' className={classes.fullWidth}>
						{props.msg}
					</Alert>
				)}
				{props.success === undefined && <CircularProgress className={classes.root} />}
				{props.success === false && (
					<Alert severity='error' className={classes.fullWidth}>
						{props.msg}
					</Alert>
				)}
			</Box>
		</Container>
	)
}

export default VerifyEmail
