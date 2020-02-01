import React from 'react'
import { Link as ReactLink, Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import { withFormik, FormikProps, Form } from 'formik'
import {
	Button,
	Container,
	Link,
	Box,
	Typography,
	createStyles,
	makeStyles,
} from '@material-ui/core'
import axios from 'axios'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Filter1OutlinedIcon from '@material-ui/icons/Filter1Outlined'
import Filter2OutlinedIcon from '@material-ui/icons/Filter2Outlined'
import styles from '../../styles'
import TextFieldWithIcon from '../reUsableComponents/TextFieldWithIcon'

const useStyles = makeStyles(createStyles(styles))

interface FormValues {
	email: string
	username: string
	firstName: string
	lastName: string
	password: string
}

const InnerForm = (props: FormikProps<FormValues>) => {
	const { touched, errors, isSubmitting } = props
	const classes = useStyles()

	if (props.status) {
		return <Redirect to='/profile' />
	}

	return (
		<React.Fragment>
			<Container maxWidth='sm'>
				<Typography variant='h1' className={classes.h1}>
					{'Sing Up'}
				</Typography>
				<Form>
					<TextFieldWithIcon
						label='Email'
						type='email'
						name='email'
						icon={MailOutlineIcon}
						handleChange={props.handleChange}
						handleBlur={props.handleBlur}
					/>
					{touched.email && errors.email && <div>{errors.email}</div>}

					<TextFieldWithIcon
						label='Username'
						type='username'
						name='username'
						icon={AccountCircleOutlinedIcon}
						handleChange={props.handleChange}
						handleBlur={props.handleBlur}
					/>
					{touched.username && errors.username && <div>{errors.username}</div>}

					<TextFieldWithIcon
						label='First name'
						type='firstName'
						name='firstName'
						icon={Filter1OutlinedIcon}
						handleChange={props.handleChange}
						handleBlur={props.handleBlur}
					/>
					{touched.firstName && errors.firstName && <div>{errors.firstName}</div>}

					<TextFieldWithIcon
						label='Last name'
						type='lastName'
						name='lastName'
						icon={Filter2OutlinedIcon}
						handleChange={props.handleChange}
						handleBlur={props.handleBlur}
					/>
					{touched.lastName && errors.lastName && <div>{errors.lastName}</div>}

					<TextFieldWithIcon
						label='Password'
						type='password'
						name='password'
						icon={LockOutlinedIcon}
						handleChange={props.handleChange}
						handleBlur={props.handleBlur}
					/>
					{touched.password && errors.password && <div>{errors.password}</div>}

					{/** Log In **/}
					<Box mt={2}>
						<Button type='submit' variant='contained' fullWidth={true} disabled={isSubmitting}>
							Sign Up
						</Button>
					</Box>

					<Box m={1} textAlign='center'>
						<Typography variant='body1'>
							{'Already have accaunt? '}
							<ReactLink to='/login'>
								<Link component='button' type='button' variant='body1'>
									{'Sign In'}
								</Link>
							</ReactLink>
						</Typography>
					</Box>
				</Form>
			</Container>
		</React.Fragment>
	)
}

const SignUp = withFormik<{}, FormValues>({
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Should be a valid email adress')
			.required('Required'),
		username: Yup.string().required('Required'),
		firstName: Yup.string().required('Required'),
		lastName: Yup.string().required('Required'),
		password: Yup.string()
			.required('Required')
			.min(6, 'Must be 6 characters or less'),
	}),

	handleSubmit: (values: FormValues, props) => {
		console.log(values)
		axios
			.post('http://localhost:5000/api/auth/register', {
				email: values.email,
				username: values.username,
				firstName: values.firstName,
				lastName: values.lastName,
				password: values.password,
			})
			.then(function(res) {
				if (res['data']['success'] === true) {
					props.setStatus(true)
				} else {
					props.setErrors({ username: res['data']['errorMsg'] })
					props.setSubmitting(false)
				}
			})
			.catch(function(error) {
				if (!error.response) {
					console.log('No Connection')
					props.setSubmitting(false)
					return
				}
				if (error.response['data']['success'] === true) {
					props.setStatus(true)
				} else {
					props.setErrors({ username: error.response['data']['errorMsg'] })
					props.setSubmitting(false)
				}
			})
	},
})(InnerForm)

export default SignUp
