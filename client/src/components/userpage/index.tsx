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
						<Grid item xs={6} style={{ paddingLeft: '2em' }}>
							<Typography variant='h4' style={{ lineHeight: 0.8, marginBottom: '0.5em', fontWeight: 'bold' }}>
								{userState.data.firstName}
							</Typography>
							<Typography style={{ borderBottom: '2px solid #28272c', paddingBottom: '1em' }}>
								<LocationOnIcon /> 5 miles away
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
												<img src={img.image} alt={'sss'} />
												{/* <GridListTileBar
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
												/> */}
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
											{userState.data.interests.map((data) => {
												return <span style={{ marginRight: '0.2em' }}>#{data}</span>
											})}
										</Grid>
									</Grid>
								</div>
							)}
							{/* <Typography variant='h5' style={{ color: '#908f96', marginTop: '1em' }}>
								Interests
							</Typography>
							{userState.data.interests.map((data) => {
								return <Chip key={data} label={data} className={profileStyles.chip} />
							})} */}
						</Grid>
					</Grid>
				)
			}
		</UserContextConsumer>
	)
}

export default UserPage
