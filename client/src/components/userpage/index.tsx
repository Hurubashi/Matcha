import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
	Box,
	Grid,
	Chip,
	Typography,
	CardMedia,
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import { UserContextConsumer } from '../../helpers/UserContextProvider'
import UserReducer from '../../reducers/UserReducer'
import ImagesReducer from '../../reducers/ImagesReducer'
import makeProfileStyles from '../profile/styles'
import makeStyles from './styles'

const UserPage: React.FC = () => {
	const { user } = useParams()
	const [userState, userDispatch] = React.useReducer(UserReducer.reducer, { status: 'loading' })
	const [imagesState, imagesrDispatch] = React.useReducer(ImagesReducer.reducer, { status: 'loading' })

	const classes = makeStyles()
	const profileStyles = makeProfileStyles()
	useEffect(() => {
		UserReducer.getUser(userDispatch, '/' + user)
		ImagesReducer.getImages(imagesrDispatch)
	}, [user])

	return (
		<UserContextConsumer>
			{(ctx) =>
				ctx &&
				userState.status === 'success' && (
					<Grid container style={{ height: 'inherit', padding: '2em' }}>
						<Grid item xs={6}>
							<CardMedia image='/images/av1.jpg' style={{ paddingTop: '150%' }} />
						</Grid>
						<Grid item xs={6} style={{ paddingLeft: '5em' }}>
							<Typography variant='h4' style={{ lineHeight: 0.8, marginBottom: '0.5em', fontWeight: 'bold' }}>
								{/* {ctx.state.status} */}
								{userState.data.firstName}, 28
							</Typography>
							<Typography style={{ borderBottom: '2px solid #28272c', paddingBottom: '1em' }}>
								<LocationOnIcon /> 5 miles away
							</Typography>
							<Typography variant='h5' style={{ color: '#908f96', marginTop: '1em' }}>
								Interests
							</Typography>
							{userState.data.interests.map((data) => {
								return <Chip key={data} label={data} className={profileStyles.chip} />
							})}
							<Typography variant='h5' style={{ color: '#908f96', marginTop: '1em' }}>
								About
							</Typography>
							<Typography>
								{userState.data.biography}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend eros
								sed est mollis scelerisque. Morbi et viverra tortor. Integer lacus orci, sodales id est vitae, hendrerit
								rhoncus nunc. Sed non porttitor mi. In ornare est eu commodo scelerisque. Nunc eu efficitur nulla.
								Praesent rutrum iaculis rhoncus. Cras ante mi, aliquam in tristique nec, facilisis sit amet mi. Nam et
								condimentum enim. Proin aliquet sem eget elit bibendum, sed facilisis eros elementum. Pellentesque quis
								lacus a massa sollicitudin auctor. Phasellus vel pulvinar orci. Ut consequat ullamcorper pulvinar.
							</Typography>
							{imagesState.status === 'success' && (
								<div className={classes.imagesList}>
									<GridList className={classes.gridList} cols={2.5}>
										{imagesState.data.map((img) => (
											<GridListTile key={img.id}>
												<img src={img.image} alt={'sss'} />
												<GridListTileBar
													title={'some titile'}
													classes={{
														root: classes.titleBar,
														title: classes.title,
													}}
													actionIcon={
														<IconButton aria-label={`star ${'some titile'}`}>
															<StarBorderIcon className={classes.title} />
														</IconButton>
													}
												/>
											</GridListTile>
										))}
									</GridList>
								</div>
							)}
						</Grid>
					</Grid>
				)
			}
		</UserContextConsumer>
	)
}

export default UserPage
