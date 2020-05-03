import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
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

const userReducer = new UserReducer()
const imagesReducer = new ImagesReducer()

const UserPage: React.FC = () => {
	const { user } = useParams()
	const [userState, userDispatch] = React.useReducer(userReducer.reducer, { status: 'loading' })
	const [imagesState, imagesDispatch] = React.useReducer(imagesReducer.reducer, { status: 'loading' })

	const classes = makeStyles()
	const profileStyles = makeProfileStyles()
	useEffect(() => {
		userReducer.getUser(userDispatch, user)
		imagesReducer.getImages(imagesDispatch)
	}, [user])

	return (
		<UserContextConsumer>
			{(ctx) =>
				ctx?.state.status === 'success' &&
				userState.status === 'success' && (
					<Grid container style={{ height: 'inherit', padding: '2em' }}>
						<Grid item xs={6}>
							<CardMedia
								image={userState.data.avatarUrl ? userState.data.avatarUrl.normal : '/images/noavatar.png'}
								style={{ paddingTop: '150%' }}
							/>
						</Grid>
						<Grid item xs={6} style={{ paddingLeft: '2em' }}>
							<Typography variant='h4' style={{ lineHeight: 0.8, marginBottom: '0.5em', fontWeight: 'bold' }}>
								{userState.data.firstName}
							</Typography>
							<Typography style={{ borderBottom: '2px solid #28272c', paddingBottom: '1em' }}>
								<LocationOnIcon />{' '}
								{userReducer.getDistanse(
									ctx.state.data.lat,
									ctx.state.data.lon,
									userState.data.lat,
									userState.data.lon,
								)}
								km away
							</Typography>
							<Typography variant='h5' style={{ color: '#908f96', marginTop: '1em' }}>
								Looking for
							</Typography>
							{userState.data.lookingFor.map((data) => {
								return <Chip key={data} label={data} className={profileStyles.chip} />
							})}
							<Typography variant='h5' style={{ color: '#908f96', marginTop: '1em' }}>
								About
							</Typography>
							<Typography>{userState.data.biography}</Typography>
							{imagesState.status === 'success' && (
								<div className={classes.imagesList}>
									<GridList className={classes.gridList} cols={3}>
										{imagesState.data.map((img) => (
											<GridListTile key={img.id} style={{ height: '10em' }}>
												<img src={img.image} alt={''} />
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
									<Grid container>
										<Grid item xs={6} style={{ marginTop: '1em' }}>
											<Typography style={{ color: '#908f96', fontSize: '0.8rem', textTransform: 'uppercase' }}>
												Relationship
											</Typography>
										</Grid>
										<Grid item xs={6} style={{ marginTop: '1em' }}>
											<Typography>It's complicated</Typography>
										</Grid>
										<Grid item xs={6} style={{ marginTop: '1em' }}>
											<Typography style={{ color: '#908f96', fontSize: '0.8rem', textTransform: 'uppercase' }}>
												Interests
											</Typography>
										</Grid>
										<Grid item xs={6} style={{ marginTop: '1em' }}>
											{userState.data.interests.map((data, idx) => {
												return (
													<span key={idx} style={{ marginRight: '0.2em' }}>
														#{data}
													</span>
												)
											})}
										</Grid>
									</Grid>
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
