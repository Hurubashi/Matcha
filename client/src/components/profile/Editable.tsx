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

interface Props {
	changeProfileData: (prop: keyof ProfileData) => (event: React.ChangeEvent<HTMLInputElement>) => void
	changeGender: (event: React.ChangeEvent<HTMLInputElement>) => void
	changePreferences: (event: React.ChangeEvent<HTMLInputElement>) => void
	changeEditable: () => void
	data: ProfileData
}

const Editable: React.FC<Props> = (props: Props) => {
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
								<TextField
									label={elem.name}
									onChange={props.changeProfileData(elem.key)}
									value={props.data[elem.key]}
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
							<RadioGroup aria-label='gender' value={props.data.gender || ''} onChange={props.changeGender} row>
								{['Male', 'Female'].map(elem => {
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
								value={props.data.preferences}
								onChange={props.changePreferences}>
								{['Male', 'Female', 'Male and Female'].map(elem => {
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
			<Box textAlign='center'>
				<TextField
					fullWidth={true}
					id='outlined-multiline-static'
					label='Biography'
					multiline
					rows='8'
					variant='outlined'
				/>
				<Button onClick={props.changeEditable} variant='outlined'>
					{'Close'}
				</Button>
				<Button onClick={props.changeEditable} variant='outlined'>
					{'Save'}
				</Button>
			</Box>
		</Card>
	)
}

export default Editable
