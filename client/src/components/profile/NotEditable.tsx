import React from 'react'
import { Box, Button, Typography, Grid } from '@material-ui/core'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import profileClasses from './styles'
import fields from './BasicFields'
import Interests from './Interests'
import LookingFor from './LookingFor'
import { Link } from 'react-router-dom'
import { User } from '../../reducers/UserReducer'

interface Props {
	user: User
	setEditable: React.Dispatch<React.SetStateAction<boolean>>
}

const NotEditable: React.FC<Props> = (props: Props) => {
	const { user, setEditable } = props
	const classes = profileClasses()

	return (
		<Box className={classes.profileCard}>
			<Grid container>
				<Grid item xs={12} md={6}>
					<div className={`${classes.profileAvatar} ${classes.visibleAvatarChange}`}>
						<img
							className={classes.profileAvatar}
							src={user.avatar ? user.avatar.normal : `/images/noavatar${user.gender}.jpg`}
							alt='Your avatar'
						/>
						<Link to='/gallery'>
							<div className={`${classes.profileAvatar} ${classes.profileAvatarChange}`}>
								<PhotoLibraryIcon className={classes.photoLibraryIcon} />
							</div>
						</Link>
					</div>
				</Grid>
				<Grid item xs={12} md={6} className={classes.basicInputFieldsContainer}>
					<Box>
						{fields.map((elem) => {
							return (
								<Typography align='left' className={classes.profileTextField} key={elem.key}>
									{elem.name}: {user[elem.key]}
								</Typography>
							)
						})}
					</Box>
					<Box textAlign='left'>
						<Typography className={classes.profileTextField}>
							{'Gender'}: {user.gender}
						</Typography>
						<Typography className={classes.profileTextField}>
							{'Sexual preferences'}: {user.preferences}
						</Typography>
					</Box>
				</Grid>
			</Grid>
			<Typography align='left' className={classes.profileTextField}>
				Latitude: {user.lat}
			</Typography>
			<Typography align='left' className={classes.profileTextField}>
				Longitude: {user.lon}
			</Typography>
			<LookingFor setProfile={null} profile={user} editable={false} />
			<Interests setProfile={null} profile={user} editable={false} />
			<Box textAlign='center'>
				<Typography align='left'>{'About'}:</Typography>
				<Box className={classes.paddingSm}>
					<Typography align='left'>{user.biography}</Typography>
				</Box>
				<Button onClick={() => setEditable(true)} variant='outlined' className={classes.marginSm}>
					{'Edit'}
				</Button>
			</Box>
		</Box>
	)
}

export default NotEditable
