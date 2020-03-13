import React from 'react'
import {
	Box,
	Container,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	FormControlLabel,
	TextField,
	Avatar,
	Card,
	Button,
	Typography,
	Grid,
} from '@material-ui/core'
import styles from '../../styles'
import Interests from './Interests'
import { ProfileData } from './ProfileInterface'

interface BasicField {
	name: string
	key: 'username' | 'email' | 'firstName' | 'lastName'
}

const Profile: React.FC = () => {
	const classes = styles()

	let fields: BasicField[] = [
		{
			name: 'Username',
			key: 'username',
		},
		{
			name: 'Email',
			key: 'email',
		},
		{
			name: 'First Name',
			key: 'firstName',
		},
		{
			name: 'Last Name',
			key: 'lastName',
		},
	]

	let [profile, setProfile] = React.useState<ProfileData>({
		username: 'string',
		email: 'test',
		firstName: 'string',
		lastName: 'string',
		gender: 'Male',
		preferences: 'Female',
		interests: ['Angular', 'jQuery', 'Polymer', 'React'],
		biography: 'string',
	})

	const changeProfileData = (prop: keyof ProfileData) => (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setProfile({ ...profile, [prop]: event.target.value })
	}
	const [editable, setEditable] = React.useState<boolean>(false)

	const changeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = (event.target as HTMLInputElement).value
		if (val === 'Male' || val === 'Female') {
			setProfile({ ...profile, gender: val })
		}
	}

	const changePreferences = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = (event.target as HTMLInputElement).value
		if (val === 'Male' || val === 'Female' || val === 'Male & Female') {
			setProfile({ ...profile, preferences: val })
		}
	}

	const changeEditable = () => {
		setEditable(!editable)
	}

	return (
		<Container maxWidth='md'>
			<Card className={classes.profileCard}>
				<Grid container>
					<Grid item xs={12} sm={6}>
						<Avatar className={classes.profileAvatar} alt='User Name' src='/images/1.jpg' />
					</Grid>

					<Grid item xs={12} sm={6} className={classes.basicInputFieldsContainer}>
						{editable
							? fields.map(elem => {
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
							  })
							: fields.map(elem => {
									return (
										<Typography align='left' className={classes.marginBottom10} key={elem.key}>
											{elem.name}: {profile[elem.key]}
										</Typography>
									)
							  })}

						{editable ? (
							<Box>
								<Box>
									<FormControl component='fieldset'>
										<FormLabel component='legend'>Choose your Gender</FormLabel>
										<RadioGroup
											aria-label='position'
											name='position'
											value={profile.gender}
											onChange={changeGender}
											row>
											<FormControlLabel
												value='Male'
												control={<Radio color='primary' />}
												label='Male'
												labelPlacement='start'
											/>
											<FormControlLabel
												value='Female'
												control={<Radio color='primary' />}
												label='Female'
												labelPlacement='start'
											/>
										</RadioGroup>
									</FormControl>
								</Box>

								<Box>
									<FormControl component='fieldset'>
										<FormLabel component='legend'>Your sexual preference</FormLabel>
										<RadioGroup
											aria-label='position'
											row
											value={profile.preferences}
											onChange={changePreferences}>
											<FormControlLabel
												value='Male'
												control={<Radio color='primary' />}
												label='Male'
												labelPlacement='start'
											/>
											<FormControlLabel
												value='Female'
												control={<Radio color='primary' />}
												label='Female'
												labelPlacement='start'
											/>
											<FormControlLabel
												value='Male & Female'
												control={<Radio color='primary' />}
												label='Male and Female'
												labelPlacement='start'
											/>
										</RadioGroup>
									</FormControl>
								</Box>
							</Box>
						) : (
							<Box textAlign='left'>
								<Typography className={classes.marginBottom10}>
									{'Gender'}: {profile.gender}
								</Typography>
								<Typography className={classes.marginBottom10}>
									{'Sexual preferences'}: {profile.preferences}
								</Typography>
							</Box>
						)}
					</Grid>
				</Grid>

				<Interests setProfile={setProfile} profile={profile} editable={editable} />

				{editable ? (
					<Box textAlign='center'>
						<TextField
							fullWidth={true}
							id='outlined-multiline-static'
							label='Biography'
							multiline
							rows='8'
							variant='outlined'
						/>
						<Button onClick={changeEditable} variant='outlined'>
							{'Close'}
						</Button>
						<Button onClick={changeEditable} variant='outlined'>
							{'Save'}
						</Button>
					</Box>
				) : (
					<Box textAlign='center'>
						<Typography>{'Biography'}:</Typography>
						<Typography>
							{
								'"John Doe" (for males) and "Jane Doe" (for females) are multiple-use names that are used when the true name of a person is unknown or is being intentionally concealed. In the context of law enforcement in the United States, such names are often used to refer to a corpse whose identity is unknown or unconfirmed. Secondly, such names are also often used to refer to a hypothetical "everyman" in other contexts, in a manner similar to "John Q. Public" or "Joe Public". There are many variants to the above names, including "John Roe", "Richard Roe", "Jane Roe" and "Baby Doe", "Janie Doe" or "Johnny Doe" (for children).'
							}
						</Typography>
						<Button onClick={changeEditable} variant='outlined'>
							{'Edit'}
						</Button>
					</Box>
				)}
			</Card>
		</Container>
	)
}

export default Profile
