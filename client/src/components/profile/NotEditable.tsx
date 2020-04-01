import React from 'react'
import { Box, Avatar, Card, Button, Typography, Grid } from '@material-ui/core'
import styles from '../../styles'
import fields from './BasicFields'
import { ProfileData } from './ProfileInterface'
import Interests from './Interests'

interface Props {
	changeEditable: () => void
	setProfile: (value: React.SetStateAction<ProfileData>) => void
	profile: ProfileData
}

const NotEditable: React.FC<Props> = (props: Props) => {
	const classes = styles()

	return (
		<Card className={classes.profileCard}>
			<Grid container>
				<Grid item xs={12} sm={6}>
					<Avatar className={classes.profileAvatar} alt='User Name' src='/images/1.jpg' />
				</Grid>
				<Grid item xs={12} sm={6} className={classes.basicInputFieldsContainer}>
					<Box>
						{fields.map(elem => {
							return (
								<Typography align='left' className={classes.marginBottom10} key={elem.key}>
									{elem.name}: {props.profile[elem.key]}
								</Typography>
							)
						})}
					</Box>
					<Box textAlign='left'>
						<Typography className={classes.marginBottom10}>
							{'Gender'}: {props.profile.gender}
						</Typography>
						<Typography className={classes.marginBottom10}>
							{'Sexual preferences'}: {props.profile.preferences}
						</Typography>
					</Box>
				</Grid>
			</Grid>
			<Interests setProfile={props.setProfile} profile={props.profile} editable={false} />
			<Box textAlign='center'>
				<Typography>{'Biography'}:</Typography>
				<Typography>{props.profile.biography}</Typography>
				<Button onClick={props.changeEditable} variant='outlined'>
					{'Edit'}
				</Button>
			</Box>
		</Card>
	)
}

export default NotEditable
