import React, { useEffect, useReducer } from 'react'
import { Container } from '@material-ui/core'
import axios from 'axios'

import reducer, { fetchProfile, saveProfile } from './ProfileReducer'
import NotEditable from './NotEditable'
import Editable from './Editable'

const Profile: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, { status: 'empty' })

	useEffect(() => {
		dispatch({ type: 'request' })
		fetchProfile(dispatch)
	}, [])

	return (
		<Container maxWidth='md'>
			{state.status === 'editing' ? (
				<Editable state={state} dispatch={dispatch} />
			) : (
				<NotEditable state={state} dispatch={dispatch} />
			)}
		</Container>
	)
}

export default Profile
