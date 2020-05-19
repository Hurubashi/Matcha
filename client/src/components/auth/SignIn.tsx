import React from 'react'
import { Link as ReactLink, Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import { withFormik, FormikProps, Form } from 'formik'
import axios from 'axios'
import { Button, Link, Box, Checkbox, FormControlLabel, Typography, Container } from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import styles from '../../styles'
import TextFieldWithIcon from '../reusableComponents/TextFieldWithIcon'

interface FormValues {
	username: string
	password: string
	remember: boolean
}

const InnerForm = (props: FormikProps<FormValues>) => {
	const { touched, errors, isSubmitting } = props
	const classes = styles()

	if (props.status) {
		return <Redirect to='/profile' />
	}
	return (
		<React.Fragment>
			<Container maxWidth='sm'>
				<Typography variant='h1' className={classes.h1}>
					{'Sign In'}
				</Typography>
				<Form>
					<TextFieldWithIcon
						label='Username'
						type='text'
						name='username'
						icon={AccountCircleOutlinedIcon}
						handleChange={props.handleChange}
						handleBlur={props.handleBlur}
					/>
					{touched.username && errors.username && <div>{errors.username}</div>}
					<TextFieldWithIcon
						label='Password'
						type='password'
						name='password'
						icon={LockOutlinedIcon}
						handleChange={props.handleChange}
						handleBlur={props.handleBlur}
					/>
					{touched.password && errors.password && <div>{errors.password}</div>}
					<Button
						type='submit'
						variant='contained'
						fullWidth={true}
						disabled={isSubmitting}
						style={{ marginTop: '2em' }}>
						{'Log In'}
					</Button>
				</Form>
				<Box m={1} textAlign='center'>
					<Typography variant='body1'>
						{'New here? '}
						<ReactLink to='/register'>
							<Link component='button' type='button' variant='body1'>
								{'Sign Up'}
							</Link>
						</ReactLink>
					</Typography>
				</Box>
			</Container>
		</React.Fragment>
	)
}

const SignIn = withFormik<{}, FormValues>({
	mapPropsToValues: (props) => {
		return {
			username: '',
			password: '',
			remember: true,
		}
	},
	validationSchema: Yup.object().shape({
		username: Yup.string().required('Required'),
		password: Yup.string().required('Required').min(6, 'Must be 6 characters or less'),
	}),

	handleSubmit: (values: FormValues, props) => {
		axios
			.post('/api/auth/login', {
				username: values.username,
				password: values.password,
			})
			.then(function (res) {
				if (res['data']['success'] === true) {
					props.setStatus(true)
				} else {
					props.setErrors({ username: res['data']['msg'] })
					props.setSubmitting(false)
				}
			})
			.catch(function (error) {
				if (error.response['data']['success'] === true) {
					props.setStatus(true)
				} else {
					props.setErrors({ username: error.response['data']['msg'] })
					props.setSubmitting(false)
				}
			})
	},
})(InnerForm)

export default SignIn
