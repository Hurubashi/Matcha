import React from 'react'
import {
	Box,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	FormControlLabel,
	TextField,
	Avatar,
	Card,
	Button,
	Grid,
} from '@material-ui/core'
import styles from '../../styles'
import fields from './BasicFields'
import { ProfileData } from './ProfileInterface'
import Interests from './Interests'

interface Props {
	changeProfileData: (prop: keyof ProfileData) => (event: React.ChangeEvent<HTMLInputElement>) => void
	setProfile: (value: React.SetStateAction<ProfileData>) => void
	changeEditable: () => void
	saveProfile: () => void
	profile: ProfileData
}

const Editable: React.FC<Props> = (props: Props) => {
	const classes = styles()

	return (
		<Card className={classes.profileCard}>
			<Grid container>
				<Grid item xs={12} md={6}>
					<Avatar className={classes.profileAvatar} alt='User Name' src='/images/1.jpg' />
				</Grid>
				<Grid item xs={12} md={6} className={classes.basicInputFieldsContainer}>
					<Box>
						{fields.map(elem => {
							return (
								<TextField
									label={elem.name}
									onChange={props.changeProfileData(elem.key)}
									value={props.profile[elem.key]}
									key={elem.key}
									fullWidth={true}
									margin='dense'
								/>
							)
						})}
					</Box>
					<Box>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>Choose your Gender</FormLabel>
							<RadioGroup
								aria-label='gender'
								value={props.profile.gender || ''}
								onChange={props.changeProfileData('gender')}
								row>
								{['male', 'female'].map(elem => {
									return (
										<FormControlLabel
											key={'gender' + elem}
											value={elem}
											control={<Radio color='primary' />}
											label={elem}
											labelPlacement='start'
										/>
									)
								})}
							</RadioGroup>
						</FormControl>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>Your sexual preference</FormLabel>
							<RadioGroup
								aria-label='preferences'
								row
								value={props.profile.preferences}
								onChange={props.changeProfileData('preferences')}>
								{['male', 'female', 'male and female'].map(elem => {
									return (
										<FormControlLabel
											key={'pref' + elem}
											value={elem}
											control={<Radio color='primary' />}
											label={elem}
											labelPlacement='start'
										/>
									)
								})}
							</RadioGroup>
						</FormControl>
					</Box>
				</Grid>
			</Grid>
			<Interests setProfile={props.setProfile} profile={props.profile} editable={true} />
			<Box textAlign='center'>
				<TextField
					fullWidth={true}
					id='outlined-multiline-static'
					label='Biography'
					multiline
					rows='8'
					variant='outlined'
					value={props.profile.biography}
					onChange={props.changeProfileData('biography')}
				/>
				<Button onClick={props.changeEditable} variant='outlined'>
					{'Close'}
				</Button>
				<Button onClick={props.saveProfile} variant='outlined'>
					{'Save'}
				</Button>
			</Box>
		</Card>
	)
}

export default Editable
