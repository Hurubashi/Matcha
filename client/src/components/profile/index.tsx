import React, { useEffect, useReducer, useState } from 'react'
import { Container } from '@material-ui/core'

import reducer, { fetchProfile } from './ProfileReducer'
import NotEditable from './NotEditable'
import Editable from './Editable'

const Profile: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, { status: 'loading' })
	const [editable, setEditable] = useState<boolean>(false)

	useEffect(() => {
		dispatch({ type: 'request' })
		fetchProfile(dispatch)
	}, [])

	return (
		<Container maxWidth='md'>
			{editable && state.status === 'success' ? (
				<Editable state={state} dispatch={dispatch} setEditable={setEditable} />
			) : (
				<NotEditable state={state} dispatch={dispatch} setEditable={setEditable} />
			)}
		</Container>
	)
}

export default Profile
