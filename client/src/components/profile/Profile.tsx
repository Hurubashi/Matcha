import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import styles from '../../styles'
// import Interests from './Interests'
import { ProfileData, Gender, Preferences } from './ProfileInterface'
import axios from 'axios'
import NotEditable from './NotEditable'
import Editable from './Editable'

const Profile: React.FC = () => {
	const classes = styles()

	let [profile, setProfile] = useState<ProfileData>({
		username: '',
		email: '',
		firstName: '',
		lastName: '',
		gender: '' as Gender,
		preferences: '' as Preferences,
		interests: [],
		biography: '',
	})

	const changeProfileData = (prop: keyof ProfileData) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setProfile({ ...profile, [prop]: event.target.value })

		// dispatch({ type: 'success', results: { ...state.data, [prop]: event.target.value } })
	}
	const [editable, setEditable] = React.useState<boolean>(false)
	const [loading, setLoading] = React.useState<boolean>(true)

	const changeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = (event.target as HTMLInputElement).value

		// dispatch({ type: 'success', results: { ...state.data, gender: val as Gender } })

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

	const saveProfile = () => {}

	useEffect(() => {
		console.log('useEffect')
		axios
			.get('/api/user/me')
			.then(function(res) {
				if (res['data']['success'] === true) {
					setProfile(res['data']['data'] as ProfileData)
					// dispatch({ type: 'success', results: res['data']['data'] as ProfileData })
				}
			})
			.catch(function(error) {
				console.log(error)
			})
	}, [])

	return (
		<Container maxWidth='md'>
			{editable ? (
				<Editable
					changeProfileData={changeProfileData}
					changeGender={changeGender}
					changePreferences={changePreferences}
					changeEditable={changeEditable}
					data={profile}
				/>
			) : (
				<NotEditable changeEditable={changeEditable} data={profile} />
			)}

			{/* <Interests setProfile={setProfile} profile={profile} editable={editable} /> */}
		</Container>
	)
}

export default Profile
