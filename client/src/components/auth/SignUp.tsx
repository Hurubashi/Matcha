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
	RadioGroup,
	FormControlLabel,
	Radio,
	Grid,
	TextField,
} from '@material-ui/core'
import axios from 'axios'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Filter1OutlinedIcon from '@material-ui/icons/Filter1Outlined'
import Filter2OutlinedIcon from '@material-ui/icons/Filter2Outlined'
import styles from '../../styles'
import TextFieldWithIcon from '../reusableComponents/TextFieldWithIcon'
import CakeIcon from '@material-ui/icons/Cake'

interface FormValues {
	email: string
	username: string
	firstName: string
	lastName: string
	password: string
	gender: string
	birth: string
}

const InnerForm = (props: FormikProps<FormValues>) => {
	const { touched, errors, isSubmitting } = props
	const classes = styles()

	if (props.status) {
		return <Redirect to='/profile' />
	}

	return (
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

				<Grid container alignItems='flex-end' style={{ height: '3.587em' }}>
					<Grid item xs={1}>
						<CakeIcon />
					</Grid>
					<Grid item xs={11}>
						<TextField
							id='date'
							type='date'
							name='birth'
							onChange={props.handleChange}
							fullWidth={true}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
				</Grid>
				{touched.birth && errors.birth && <div>{errors.birth}</div>}

				<Grid container alignItems='flex-end' style={{ height: '3.587em' }}>
					<Grid item xs={1}>
						<img src={'/images/genderIcon.svg'} alt='gender' style={{ width: '2em', height: '2em' }} />
					</Grid>
					<Grid item xs={11}>
						<RadioGroup
							aria-label='gender'
							onChange={props.handleChange}
							row
							name='gender'
							style={{ borderBottom: '0.5px solid #0f0f11' }}>
							{['male', 'female'].map((elem) => {
								return (
									<FormControlLabel
										key={'gender' + elem}
										value={elem}
										control={<Radio color='primary' />}
										label={elem}
										labelPlacement='end'
									/>
								)
							})}
						</RadioGroup>
					</Grid>
				</Grid>
				{touched.gender && errors.gender && <div>{errors.gender}</div>}

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
	)
}

const SignUp = withFormik<{}, FormValues>({
	mapPropsToValues: (props) => {
		return {
			email: '',
			username: '',
			firstName: '',
			lastName: '',
			password: '',
			birth: '',
			gender: '',
		}
	},
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Should be a valid email adress').required('Required'),
		username: Yup.string().required('Required'),
		firstName: Yup.string().required('Required'),
		lastName: Yup.string().required('Required'),
		password: Yup.string().required('Required').min(6, 'Must be 6 characters or less'),
		birth: Yup.string().required('Required'),
		gender: Yup.string().required('Required'),
	}),

	handleSubmit: (values: FormValues, props) => {
		console.log(values)
		axios
			.post('/api/auth/register', {
				email: values.email,
				username: values.username,
				firstName: values.firstName,
				lastName: values.lastName,
				password: values.password,
				birth: values.birth,
				gender: values.gender,
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
				if (!error.response) {
					console.log('No Connection')
					props.setSubmitting(false)
					return
				}
				if (error.response['data']['success'] === true) {
					props.setStatus(true)
				} else {
					props.setErrors({ username: error.response['data']['msg'] })
					props.setSubmitting(false)
				}
			})
	},
})(InnerForm)

export default SignUp
