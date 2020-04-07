import React from 'react'
import { Box, Card, Button, Typography, Grid } from '@material-ui/core'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import profileClasses from './styles'
import fields from './BasicFields'
import { ProfileData } from './ProfileInterface'
import Interests from './Interests'
import { Link } from 'react-router-dom'

interface Props {
	changeEditable: () => void
	setProfile: (value: React.SetStateAction<ProfileData>) => void
	profile: ProfileData
}

const NotEditable: React.FC<Props> = (props: Props) => {
	const classes = profileClasses()
	let avChange = React.useRef<HTMLDivElement>(null)

	const mouseEnterAvatar = () => {
		const elem = avChange.current
		if (elem) {
			elem.style.visibility = 'visible'
		}
	}

	const mouseLeaveAvatar = () => {
		const elem = avChange.current
		if (elem) {
			elem.style.visibility = 'hidden'
		}
	}

	return (
		<Card className={classes.profileCard}>
			<Grid container>
				<Grid item xs={12} md={6}>
					<img
						className={classes.profileAvatar}
						src='/images/1.jpg'
						onMouseEnter={mouseEnterAvatar}
						onMouseLeave={mouseLeaveAvatar}
					/>
					<Link to='/gallery'>
						<div
							className={`${classes.profileAvatar} ${classes.profileAvatarChange}`}
							ref={avChange}
							onMouseEnter={mouseEnterAvatar}
							onMouseLeave={mouseLeaveAvatar}>
							<PhotoLibraryIcon className={classes.photoLibraryIcon} />
						</div>
					</Link>
				</Grid>
				<Grid item xs={12} md={6} className={classes.basicInputFieldsContainer}>
					<Box>
						{fields.map(elem => {
							return (
								<Typography align='left' className={classes.profileTextField} key={elem.key}>
									{elem.name}: {props.profile[elem.key]}
								</Typography>
							)
						})}
					</Box>
					<Box textAlign='left'>
						<Typography className={classes.profileTextField}>
							{'Gender'}: {props.profile.gender}
						</Typography>
						<Typography className={classes.profileTextField}>
							{'Sexual preferences'}: {props.profile.preferences}
						</Typography>
					</Box>
				</Grid>
			</Grid>
			<Interests setProfile={props.setProfile} profile={props.profile} editable={false} />
			<Box textAlign='center'>
				<Typography align='left'>{'Biography'}:</Typography>
				<Typography align='left'>{props.profile.biography}</Typography>
				<Button onClick={props.changeEditable} variant='outlined' className={classes.marginSm}>
					{'Edit'}
				</Button>
			</Box>
		</Card>
	)
}

export default NotEditable
