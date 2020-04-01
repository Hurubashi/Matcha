import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
// import Interests from './Interests'
import { ProfileData, Gender, Preferences } from './ProfileInterface'
import axios from 'axios'
import NotEditable from './NotEditable'
import Editable from './Editable'

const Profile: React.FC = () => {
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

	const changeEditable = () => {
		setEditable(!editable)
	}

	useEffect(() => {
		console.log('useEffect')
		axios
			.get('/api/user/me')
			.then(function(res) {
				if (res['data']['success'] === true) {
					console.log(res['data']['data'])
					setProfile(res['data']['data'] as ProfileData)
					// dispatch({ type: 'success', results: res['data']['data'] as ProfileData })
				}
			})
			.catch(function(error) {
				console.log(error)
			})
	}, [])

	const saveProfile = () => {
		console.log(profile)
		axios
			.put('/api/user/me', profile)
			.then(function(res) {
				if (res['data']['success'] === true) {
					console.log(res['data'])
					// setProfile(res['data']['data'] as ProfileData)
					// dispatch({ type: 'success', results: res['data']['data'] as ProfileData })
				}
			})
			.catch(function(error) {
				console.log(error)
			})
	}

	return (
		<Container maxWidth='md'>
			{editable ? (
				<Editable
					changeProfileData={changeProfileData}
					setProfile={setProfile}
					changeEditable={changeEditable}
					saveProfile={saveProfile}
					profile={profile}
				/>
			) : (
				<NotEditable changeEditable={changeEditable} setProfile={setProfile} profile={profile} />
			)}

			{/* <Interests setProfile={setProfile} profile={profile} editable={editable} /> */}
		</Container>
	)
}

export default Profile
