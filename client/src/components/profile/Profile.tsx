import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { ProfileData, Gender, Preferences } from './ProfileInterface'
import axios from 'axios'
import NotEditable from './NotEditable'
import Editable from './Editable'
import Interests from './Interests'

let emptyProfile = {
	username: '',
	email: '',
	firstName: '',
	lastName: '',
	gender: '' as Gender,
	preferences: '' as Preferences,
	interests: [],
	biography: '',
}

const Profile: React.FC = () => {
	const [profile, setProfile] = useState<ProfileData>(emptyProfile)
	const [editable, setEditable] = React.useState<boolean>(false)
	const [loading, setLoading] = React.useState<boolean>(true)
	const [unchangedProfile, setUnchangedProfile] = React.useState<ProfileData>(emptyProfile)

	const changeEditable = () => {
		setEditable(!editable)
		if (!editable) {
			setUnchangedProfile({ ...profile, interests: profile.interests.slice() })
		} else {
			setProfile(unchangedProfile)
		}
	}

	useEffect(() => {
		axios
			.get('/api/user/me')
			.then(function(res) {
				if (res['data']['success'] === true) {
					setProfile(res['data']['data'] as ProfileData)
				}
			})
			.catch(function(error) {
				console.log(error)
			})
	}, [])

	const changeProfileData = (prop: keyof ProfileData) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setProfile({ ...profile, [prop]: event.target.value })
	}

	const saveProfile = () => {
		axios
			.put('/api/user/me', profile)
			.then(function(res) {
				if (res['data']['success'] === true) {
					console.log(res['data'])
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
		</Container>
	)
}

export default Profile
