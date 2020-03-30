import React, { useEffect, useReducer } from 'react'
import {
	Box,
	Container,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	FormControlLabel,
	TextField,
	Avatar,
	Card,
	Button,
	Typography,
	Grid,
} from '@material-ui/core'
import styles from '../../styles'
// import Interests from './Interests'
import { ProfileData, Gender, Preferences } from './ProfileInterface'
import axios from 'axios'
import { reducer, initialState } from './ProfileReducer'

interface BasicField {
	name: string
	key: 'username' | 'email' | 'firstName' | 'lastName'
}

const Profile: React.FC = () => {
	const classes = styles()

	let fields: BasicField[] = [
		{
			name: 'Username',
			key: 'username',
		},
		{
			name: 'Email',
			key: 'email',
		},
		{
			name: 'First Name',
			key: 'firstName',
		},
		{
			name: 'Last Name',
			key: 'lastName',
		},
	]

	let [state, dispatch] = useReducer(reducer, initialState)

	const changeProfileData = (prop: keyof ProfileData) => (event: React.ChangeEvent<HTMLInputElement>) => {
		// setProfile({ ...profile, [prop]: event.target.value })
	}
	const [editable, setEditable] = React.useState<boolean>(false)
	const [loading, setLoading] = React.useState<boolean>(true)

	const changeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = (event.target as HTMLInputElement).value
		// dispatch({ type: 'success', results: { ...profile, gender: val as Gender } })

		dispatch({ type: 'success', results: { ...state.data, gender: val as Gender } })

		// if (val === 'Male' || val === 'Female') {
		// 	setProfile({ ...profile, gender: val })
		// }
	}

	const changePreferences = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = (event.target as HTMLInputElement).value

		// state.data = { ...profile, preferences: val as Preferences }
		dispatch({ type: 'success', results: { ...state.data, preferences: val as Preferences } })
		// console.log('data')

		// console.log(state.data.preferences)
		// console.log('profile')

		// console.log(profile.preferences)

		if (val === 'Male' || val === 'Female' || val === 'Male and Female') {
			// setProfile({ ...profile, preferences: val })
		}
	}

	const changeEditable = () => {
		setEditable(!editable)
		dispatch({ type: 'request', results: state.data })
	}

	const saveProfile = () => {}

	useEffect(() => {
		console.log('useEffect')
		axios
			.get('/api/user/me')
			.then(function(res) {
				if (res['data']['success'] === true) {
					// return { ...profile, ...res['data']['data'] }
					// console.log(res['data']['data'])
					// setProfile({ ...profile, ...res['data']['data'] })
					console.log('DATA LOADED')
					console.log(res['data']['data'])
					dispatch({ type: 'success', results: res['data']['data'] as ProfileData })
				}
			})
			.catch(function(error) {
				console.log(error)
				// setProfile({ ...profile })
				// if (error.response && error.response['data']['success'] === true) {
				// 	console.log(error.response['data']['msg'])
				// }
			})
	}, [dispatch])

	return (
		<Container maxWidth='md'>
			<Card className={classes.profileCard}>
				<Grid container>
					<Grid item xs={12} sm={6}>
						<Avatar className={classes.profileAvatar} alt='User Name' src='/images/1.jpg' />
					</Grid>
					<Grid item xs={12} sm={6} className={classes.basicInputFieldsContainer}>
						{editable
							? fields.map(elem => {
									return (
										<TextField
											label={elem.name}
											onChange={changeProfileData(elem.key)}
											value={state.data[elem.key]}
											key={elem.key}
											fullWidth={true}
											margin='dense'
										/>
									)
							  })
							: fields.map(elem => {
									return (
										<Typography align='left' className={classes.marginBottom10} key={elem.key}>
											{elem.name}: {state.data[elem.key]}
										</Typography>
									)
							  })}

						{editable ? (
							<Box>
								<FormControl component='fieldset'>
									<FormLabel component='legend'>Choose your Gender</FormLabel>
									<RadioGroup aria-label='gender' value={state.data.gender || ''} onChange={changeGender} row>
										{['Male', 'Female'].map(elem => {
											return (
												<FormControlLabel
													key={'gender' + elem}
													value={elem}
													control={<Radio color='primary' />}
													label={elem}
													labelPlacement='start'
												/>
											)
										})}
									</RadioGroup>
								</FormControl>
								<FormControl component='fieldset'>
									<FormLabel component='legend'>Your sexual preference</FormLabel>
									<RadioGroup aria-label='preferences' row value={state.data.preferences} onChange={changePreferences}>
										{['Male', 'Female', 'Male and Female'].map(elem => {
											return (
												<FormControlLabel
													key={'pref' + elem}
													value={elem}
													control={<Radio color='primary' />}
													label={elem}
													labelPlacement='start'
												/>
											)
										})}
									</RadioGroup>
								</FormControl>
							</Box>
						) : (
							<Box textAlign='left'>
								<Typography className={classes.marginBottom10}>
									{'Gender'}: {state.data.gender}
								</Typography>
								<Typography className={classes.marginBottom10}>
									{'Sexual preferences'}: {state.data.preferences}
								</Typography>
							</Box>
						)}
					</Grid>
				</Grid>
				{/* <Interests setProfile={setProfile} profile={profile} editable={editable} /> */}
				{editable ? (
					<Box textAlign='center'>
						<TextField
							fullWidth={true}
							id='outlined-multiline-static'
							label='Biography'
							multiline
							rows='8'
							variant='outlined'
						/>
						<Button onClick={changeEditable} variant='outlined'>
							{'Close'}
						</Button>
						<Button onClick={changeEditable} variant='outlined'>
							{'Save'}
						</Button>
					</Box>
				) : (
					<Box textAlign='center'>
						<Typography>{'Biography'}:</Typography>
						<Typography>{state.data.biography}</Typography>
						<Button onClick={changeEditable} variant='outlined'>
							{'Edit'}
						</Button>
					</Box>
				)}
			</Card>
		</Container>
	)
}

export default Profile
