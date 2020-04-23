import React, { useState } from 'react'
import {
	Box,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	FormControlLabel,
	TextField,
	Button,
	Grid,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import profileClasses from './styles'
import fields from './BasicFields'
import Interests from './Interests'
import { Action } from '../../reducers/RequestReducer'
import UserReducer, { User } from '../../reducers/UserReducer'

interface Props {
	dispatch: React.Dispatch<Action<User>>
	user: User
	setEditable: React.Dispatch<React.SetStateAction<boolean>>
}

const Editable: React.FC<Props> = (props: Props) => {
	const classes = profileClasses()
	const { dispatch, user, setEditable } = props
	const [profile, setProfile] = useState<User>({
		...user,
		interests: user.interests.slice(),
	})

	const changeProfileData = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setProfile({ ...profile, [prop]: event.target.value })
	}

	const closeEditing = () => {
		dispatch({ type: 'success', results: user })
		setEditable(false)
	}

	return (
		<Box className={classes.profileCard}>
			<Grid container>
				<Grid item xs={12} md={6}>
					<div className={`${classes.profileAvatar} ${classes.visibleAvatarChange}`}>
						<img
							className={classes.profileAvatar}
							src={profile.avatarUrl ? profile.avatarUrl : '/images/noavatar.png'}
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
								<TextField
									label={elem.name}
									onChange={changeProfileData(elem.key)}
									value={profile[elem.key]}
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
							<RadioGroup aria-label='gender' value={profile.gender || ''} onChange={changeProfileData('gender')} row>
								{['male', 'female'].map((elem) => {
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
								value={profile.preferences}
								onChange={changeProfileData('preferences')}>
								{['male', 'female', 'male and female'].map((elem) => {
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
			<Interests setProfile={setProfile} profile={profile} editable={true} />
			<Box textAlign='center'>
				<TextField
					fullWidth={true}
					id='outlined-multiline-static'
					label='About'
					multiline
					rows='8'
					variant='outlined'
					value={profile.biography}
					onChange={changeProfileData('biography')}
				/>
				<Button onClick={closeEditing} variant='outlined' className={classes.marginSm}>
					{'Close'}
				</Button>
				<Button
					onClick={() => UserReducer.saveUser(profile, dispatch, () => setEditable(false))}
					variant='outlined'
					className={classes.marginSm}>
					{'Save'}
				</Button>
			</Box>
		</Box>
	)
}

export default Editable
