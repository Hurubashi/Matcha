import React from 'react'
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core/'

import axios from 'axios'
import appBarMakeStyles from './styles'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'

const PrimaryAppBar: React.FC = () => {
	const classes = appBarMakeStyles()

	const handleLogOut = () => {
		axios
			.post('/api/auth/logout')
			.then(function (res) {
				// setRedirect(true)
			})
			.catch(function (error) {
				// props.setErrors({ username: error })
			})
	}

	const menu = [
		{
			name: 'Gallery',
			route: '/gallery',
		},
		{
			name: 'My Profile',
			route: '/profile',
		},
	]
	return (
		<AppBar position='static' className={classes.appBar}>
			<Toolbar>
				<Typography variant='h3'>Matcha</Typography>
				<div className={classes.grow} />
				{menu.map((elem, idx) => {
					return (
						<IconButton className={classes.iconButton} color='inherit' key={idx}>
							<Link to={elem.route} className={classes.link}>
								{elem.name}
							</Link>
						</IconButton>
					)
				})}
			</Toolbar>
		</AppBar>
	)
}

export default PrimaryAppBar
