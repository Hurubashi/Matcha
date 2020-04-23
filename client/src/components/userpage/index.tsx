import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContextConsumer } from '../../helpers/UserContextProvider'
import UserReducer from '../../reducers/UserReducer'
import Typography from '@material-ui/core/Typography/Typography'
import { Box } from '@material-ui/core'

const UserPage: React.FC = () => {
	const { user } = useParams()
	const [state, dispatch] = React.useReducer(UserReducer.reducer, { status: 'loading' })

	useEffect(() => {
		UserReducer.getUser(dispatch, '/' + user)
	}, [user])

	return (
		<UserContextConsumer>
			{(ctx) =>
				ctx && (
					<Box>
						<Typography>
							{ctx.state.status}
							{state.status === 'success' && state.data.firstName}
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempus imperdiet augue, id dapibus justo
							blandit aliquam. Mauris sit amet faucibus quam. Nulla vitae dignissim mauris. Maecenas arcu nunc, finibus
							eu suscipit id, auctor non purus. Duis ullamcorper mauris a neque dignissim, sit amet vestibulum neque
							vestibulum. Aenean pellentesque dui non ante varius pharetra. Curabitur ac ante gravida, accumsan lacus
							eget, consequat mauris. Aliquam bibendum justo vitae nisi dignissim, at elementum erat consectetur.
							Integer eu feugiat nisi. Proin et consequat sapien. Curabitur fringilla lacinia pellentesque. Curabitur
							pharetra turpis et urna euismod lobortis. Vestibulum pellentesque at risus ornare ultricies. Donec posuere
							quam urna, eget egestas est luctus at. In a odio et risus luctus dignissim eu eu massa. Nam tincidunt
							suscipit ligula, eget fermentum nibh iaculis vitae. Nunc ultrices lacus ex, at rhoncus dui consectetur
							venenatis. Etiam tincidunt odio sit amet ipsum lobortis convallis. Quisque ac placerat justo. Donec ut
							accumsan purus, in lobortis nulla. Vestibulum vitae vulputate neque. Class aptent taciti sociosqu ad
							litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse vel blandit turpis. Suspendisse
							scelerisque condimentum justo ut feugiat. Etiam vitae purus nec eros iaculis laoreet non eu purus.
							Suspendisse eget dolor in quam gravida vehicula sed vel libero. Duis augue lacus, consequat suscipit
							sapien vel, aliquam mattis ipsum. Duis viverra, tellus a iaculis consequat, magna ligula tristique orci,
							et pretium tellus magna at felis. Mauris vitae pretium libero. Nulla convallis nisl at molestie consequat.
							Integer vulputate pretium ornare. Mauris aliquam sodales orci, a pulvinar nisl viverra quis. Pellentesque
							convallis justo sit amet pulvinar feugiat. Maecenas efficitur tincidunt urna quis faucibus. Nulla
							tincidunt lorem ac facilisis commodo. Praesent justo nunc, finibus tempor nisl dignissim, mattis mollis
							lacus. Mauris convallis id tellus vel rhoncus. Sed vitae nunc ipsum. Nulla sit amet mauris neque. Nulla
							non mi ac quam volutpat tempus. Vivamus gravida libero ac felis cursus, et gravida velit interdum.
							Suspendisse commodo cursus nulla vel vehicula. Donec pulvinar magna lacinia est bibendum tempor. Mauris
							fermentum rutrum vehicula. Ut ac ligula purus. Ut eleifend quam sed bibendum laoreet. Ut eu consectetur
							eros. Integer luctus vel ante quis mattis. Aliquam at dignissim libero. Nunc orci justo, tempus vel
							faucibus a, facilisis ac felis. Sed vitae nisl elementum elit maximus lacinia quis id nibh. Etiam ac
							pulvinar leo, sed placerat magna. Sed at mattis nisi. Donec lobortis mauris erat. Integer finibus semper
							dictum. Nam vulputate lacus ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
							per inceptos himenaeos. Nulla mattis mollis sapien ut tincidunt. Nunc vestibulum nisi id magna maximus,
							non dapibus nunc ultricies. Praesent feugiat, nunc non auctor dignissim, dolor massa rhoncus diam, non
							interdum magna urna a orci. Vestibulum ac sodales lectus. Aenean et risus vel leo varius interdum. Vivamus
							vitae egestas lorem, id posuere turpis. Etiam justo justo, luctus in risus at, lacinia lobortis ligula.
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempus imperdiet augue, id dapibus justo
							blandit aliquam. Mauris sit amet faucibus quam. Nulla vitae dignissim mauris. Maecenas arcu nunc, finibus
							eu suscipit id, auctor non purus. Duis ullamcorper mauris a neque dignissim, sit amet vestibulum neque
							vestibulum. Aenean pellentesque dui non ante varius pharetra. Curabitur ac ante gravida, accumsan lacus
							eget, consequat mauris. Aliquam bibendum justo vitae nisi dignissim, at elementum erat consectetur.
							Integer eu feugiat nisi. Proin et consequat sapien. Curabitur fringilla lacinia pellentesque. Curabitur
							pharetra turpis et urna euismod lobortis. Vestibulum pellentesque at risus ornare ultricies. Donec posuere
							quam urna, eget egestas est luctus at. In a odio et risus luctus dignissim eu eu massa. Nam tincidunt
							suscipit ligula, eget fermentum nibh iaculis vitae. Nunc ultrices lacus ex, at rhoncus dui consectetur
							venenatis. Etiam tincidunt odio sit amet ipsum lobortis convallis. Quisque ac placerat justo. Donec ut
							accumsan purus, in lobortis nulla. Vestibulum vitae vulputate neque. Class aptent taciti sociosqu ad
							litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse vel blandit turpis. Suspendisse
							scelerisque condimentum justo ut feugiat. Etiam vitae purus nec eros iaculis laoreet non eu purus.
							Suspendisse eget dolor in quam gravida vehicula sed vel libero. Duis augue lacus, consequat suscipit
							sapien vel, aliquam mattis ipsum. Duis viverra, tellus a iaculis consequat, magna ligula tristique orci,
							et pretium tellus magna at felis. Mauris vitae pretium libero. Nulla convallis nisl at molestie consequat.
							Integer vulputate pretium ornare. Mauris aliquam sodales orci, a pulvinar nisl viverra quis. Pellentesque
							convallis justo sit amet pulvinar feugiat. Maecenas efficitur tincidunt urna quis faucibus. Nulla
							tincidunt lorem ac facilisis commodo. Praesent justo nunc, finibus tempor nisl dignissim, mattis mollis
							lacus. Mauris convallis id tellus vel rhoncus. Sed vitae nunc ipsum. Nulla sit amet mauris neque. Nulla
							non mi ac quam volutpat tempus. Vivamus gravida libero ac felis cursus, et gravida velit interdum.
							Suspendisse commodo cursus nulla vel vehicula. Donec pulvinar magna lacinia est bibendum tempor. Mauris
							fermentum rutrum vehicula. Ut ac ligula purus. Ut eleifend quam sed bibendum laoreet. Ut eu consectetur
							eros. Integer luctus vel ante quis mattis. Aliquam at dignissim libero. Nunc orci justo, tempus vel
							faucibus a, facilisis ac felis. Sed vitae nisl elementum elit maximus lacinia quis id nibh. Etiam ac
							pulvinar leo, sed placerat magna. Sed at mattis nisi. Donec lobortis mauris erat. Integer finibus semper
							dictum. Nam vulputate lacus ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
							per inceptos himenaeos. Nulla mattis mollis sapien ut tincidunt. Nunc vestibulum nisi id magna maximus,
							non dapibus nunc ultricies. Praesent feugiat, nunc non auctor dignissim, dolor massa rhoncus diam, non
							interdum magna urna a orci. Vestibulum ac sodales lectus. Aenean et risus vel leo varius interdum. Vivamus
							vitae egestas lorem, id posuere turpis. Etiam justo justo, luctus in risus at, lacinia lobortis ligula.
						</Typography>
					</Box>
				)
			}
		</UserContextConsumer>
	)
}

export default UserPage
