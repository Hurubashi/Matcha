import React, { useState } from 'react'
import { Container } from '@material-ui/core'

import NotEditable from './NotEditable'
import Editable from './Editable'
import { UserContextConsumer } from '../../helpers/UserContextProvider'

const Profile: React.FC = () => {
	const [editable, setEditable] = useState<boolean>(false)

	return (
		<UserContextConsumer>
			{(ctx) =>
				ctx && (
					<Container maxWidth='md'>
						{editable && ctx.state.status === 'success' && (
							<Editable user={ctx.state.data} dispatch={ctx.dispatch} setEditable={setEditable} />
						)}

						{!editable && ctx.state.status === 'success' && (
							<NotEditable user={ctx.state.data} setEditable={setEditable} />
						)}
					</Container>
				)
			}
		</UserContextConsumer>
	)
}

export default Profile
