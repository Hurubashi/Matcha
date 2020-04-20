import React from 'react'
import { Box, Card, Button, Typography, Grid } from '@material-ui/core'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import profileClasses from './styles'
import fields from './BasicFields'
import Interests from './Interests'
import { Link } from 'react-router-dom'
import { State, Action } from './ProfileReducer'

interface Props {
	dispatch: React.Dispatch<Action>
	state: State
	setEditable: React.Dispatch<React.SetStateAction<boolean>>
}

const NotEditable: React.FC<Props> = (props: Props) => {
	const classes = profileClasses()

	return props.state.status === 'success' ? (
		<Card className={classes.profileCard}>
			<Grid container>
				<Grid item xs={12} md={6}>
					<div className={`${classes.profileAvatar} ${classes.visibleAvatarChange}`}>
						<img
							className={classes.profileAvatar}
							src={props.state.data.avatarUrl ? props.state.data.avatarUrl : '/images/noavatar.png'}
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
							return props.state.status === 'success' ? (
								<Typography align='left' className={classes.profileTextField} key={elem.key}>
									{elem.name}: {props.state.data[elem.key]}
								</Typography>
							) : null
						})}
					</Box>
					<Box textAlign='left'>
						<Typography className={classes.profileTextField}>
							{'Gender'}: {props.state.data.gender}
						</Typography>
						<Typography className={classes.profileTextField}>
							{'Sexual preferences'}: {props.state.data.preferences}
						</Typography>
					</Box>
				</Grid>
			</Grid>
			<Interests setProfile={null} profile={props.state.data} editable={false} />
			<Box textAlign='center'>
				<Typography align='left'>{'Biography'}:</Typography>
				<Typography align='left'>{props.state.data.biography}</Typography>
				<Button onClick={() => props.setEditable(true)} variant='outlined' className={classes.marginSm}>
					{'Edit'}
				</Button>
			</Box>
		</Card>
	) : (
		<div>Not editalbe</div>
	)
}

export default NotEditable
