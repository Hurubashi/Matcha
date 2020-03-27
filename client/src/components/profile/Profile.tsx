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
import Interests from './Interests'
import { ProfileData, Gender } from './ProfileInterface'
import axios from 'axios'

interface BasicField {
	name: string
	key: 'username' | 'email' | 'firstName' | 'lastName'
}

type State = {
	data: ProfileData
	isLoading: boolean
	error?: string
}

type Action =
	| { type: 'request'; results: ProfileData }
	| { type: 'success'; results: ProfileData }
	| { type: 'failure'; error: string; results: ProfileData }

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'request':
			return { isLoading: true, data: action.results }
		case 'success':
			return { isLoading: false, data: action.results }
		case 'failure':
			return { isLoading: false, error: action.error, data: action.results }
	}
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

	let [state, dispatch] = useReducer(reducer, {
		isLoading: true,
		data: {
			username: '',
			email: '',
			firstName: '',
			lastName: '',
			gender: '',
			preferences: '',
			interests: [],
			biography: '',
		},
	})

	let profile = state.data

	const changeProfileData = (prop: keyof ProfileData) => (event: React.ChangeEvent<HTMLInputElement>) => {
		// setProfile({ ...profile, [prop]: event.target.value })
	}
	const [editable, setEditable] = React.useState<boolean>(false)
	const [loading, setLoading] = React.useState<boolean>(true)

	const changeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = (event.target as HTMLInputElement).value
		dispatch({ type: 'success', results: { ...profile, gender: val as Gender } })
		// if (val === 'Male' || val === 'Female') {
		// 	setProfile({ ...profile, gender: val })
		// }
	}

	const changePreferences = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = (event.target as HTMLInputElement).value
		if (val === 'Male' || val === 'Female' || val === 'Male and Female') {
			// setProfile({ ...profile, preferences: val })
		}
	}

	const changeEditable = () => {
		setEditable(!editable)
	}

	useEffect(() => {
		axios
			.get('/api/user/me')
			.then(function(res) {
				if (res['data']['success'] === true) {
					// return { ...profile, ...res['data']['data'] }
					// console.log(res['data']['data'])
					// setProfile({ ...profile, ...res['data']['data'] })
					console.log('DATA LOADED')
					dispatch({ type: 'success', results: res['data']['success'] as ProfileData })
				}
			})
			.catch(function(error) {
				// return { ...profile }
				console.log(error)
				// setProfile({ ...profile })
				// if (error.response && error.response['data']['success'] === true) {
				// 	console.log(error.response['data']['msg'])
				// }
			})
	}, [])

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
											value={profile[elem.key]}
											key={elem.key}
											fullWidth={true}
											margin='dense'
										/>
									)
							  })
							: fields.map(elem => {
									return (
										<Typography align='left' className={classes.marginBottom10} key={elem.key}>
											{elem.name}: {profile[elem.key]}
										</Typography>
									)
							  })}

						{editable ? (
							<Box>
								<Box>
									<FormControl component='fieldset'>
										<FormLabel component='legend'>Choose your Gender</FormLabel>
										<RadioGroup
											aria-label='position'
											name='position'
											value={profile.gender}
											onChange={changeGender}
											row>
											<FormControlLabel
												value='Male'
												control={<Radio color='primary' />}
												label='Male'
												labelPlacement='start'
											/>
											<FormControlLabel
												value='Female'
												control={<Radio color='primary' />}
												label='Female'
												labelPlacement='start'
											/>
										</RadioGroup>
									</FormControl>
								</Box>

								<Box>
									<FormControl component='fieldset'>
										<FormLabel component='legend'>Your sexual preference</FormLabel>
										<RadioGroup aria-label='position' row value={profile.preferences} onChange={changePreferences}>
											<FormControlLabel
												value='Male'
												control={<Radio color='primary' />}
												label='Male'
												labelPlacement='start'
											/>
											<FormControlLabel
												value='Female'
												control={<Radio color='primary' />}
												label='Female'
												labelPlacement='start'
											/>
											<FormControlLabel
												value='Male and Female'
												control={<Radio color='primary' />}
												label='Male and Female'
												labelPlacement='start'
											/>
										</RadioGroup>
									</FormControl>
								</Box>
							</Box>
						) : (
							<Box textAlign='left'>
								<Typography className={classes.marginBottom10}>
									{'Gender'}: {profile.gender}
								</Typography>
								<Typography className={classes.marginBottom10}>
									{'Sexual preferences'}: {profile.preferences}
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
						<Typography>{profile.biography}</Typography>
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
