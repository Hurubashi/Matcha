import React, { useEffect, useReducer, useState } from 'react'
import { Container } from '@material-ui/core'

// import reducer, { fetchProfile } from '../../reducers/ProfileReducer'
import NotEditable from './NotEditable'
import Editable from './Editable'
import UserReducer from '../../reducers/UserReducer'

const Profile: React.FC = () => {
	const [state, dispatch] = useReducer(UserReducer.reducer, { status: 'loading' })
	const [editable, setEditable] = useState<boolean>(false)

	useEffect(() => {
		dispatch({ type: 'request' })
		UserReducer.getUser(dispatch)
		// fetchProfile(dispatch)
	}, [])

	return (
		<Container maxWidth='md'>
			{editable && state.status === 'success' ? (
				<Editable user={state.data} dispatch={dispatch} setEditable={setEditable} />
			) : (
				<NotEditable state={state} dispatch={dispatch} setEditable={setEditable} />
			)}
		</Container>
	)
}

export default Profile
