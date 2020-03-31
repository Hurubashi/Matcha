import React from 'react'
import { Box, Avatar, Card, Button, Typography, Grid } from '@material-ui/core'
import styles from '../../styles'
import fields from './BasicFields'
import { ProfileData } from './ProfileInterface'

interface Props {
	changeEditable: () => void
	data: ProfileData
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
									{elem.name}: {props.data[elem.key]}
								</Typography>
							)
						})}
					</Box>
					<Box textAlign='left'>
						<Typography className={classes.marginBottom10}>
							{'Gender'}: {props.data.gender}
						</Typography>
						<Typography className={classes.marginBottom10}>
							{'Sexual preferences'}: {props.data.preferences}
						</Typography>
					</Box>
				</Grid>
			</Grid>
			<Box textAlign='center'>
				<Typography>{'Biography'}:</Typography>
				<Typography>{props.data.biography}</Typography>
				<Button onClick={props.changeEditable} variant='outlined'>
					{'Edit'}
				</Button>
			</Box>
		</Card>
	)
}

export default NotEditable
