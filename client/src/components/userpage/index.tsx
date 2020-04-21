import React from 'react'
import { useParams } from 'react-router-dom'
import { UserContextConsumer } from '../../helpers/UserContextProvider'

const UserPage: React.FC = () => {
	const { user } = useParams()
	console.log(user)
	return <UserContextConsumer>{(ctx) => ctx && <div>{ctx.state.status}</div>}</UserContextConsumer>
}

export default UserPage
