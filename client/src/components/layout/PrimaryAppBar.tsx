import React from 'react'
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core/'

import axios from 'axios'
import appBarMakeStyles from './styles'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import { UserContextConsumer } from '../../helpers/UserContextProvider'
import SettingsIcon from '@material-ui/icons/Settings'

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
			name: 'Settings',
			route: '/profile',
		},
	]
	return (
		<UserContextConsumer>
			{(ctx) =>
				ctx?.state.status === 'success' && (
					<AppBar position='static' className={classes.appBar}>
						<Toolbar>
							<Typography variant='h3'>Matcha</Typography>
							<div className={classes.grow} />
							<Link to='/search' className={classes.link}>
								<IconButton className={classes.iconButton} color='inherit'>
									{'Search'}
								</IconButton>
							</Link>
							<Link to={ctx.state.data.username} className={classes.link}>
								<IconButton className={classes.iconButton} color='inherit'>
									{'My profile'}
								</IconButton>
							</Link>
							<Link to='/profile' className={classes.link}>
								<IconButton className={classes.iconButton} color='inherit'>
									<SettingsIcon />
								</IconButton>
							</Link>
							{/* {menu.map((elem, idx) => {
								return (
									<Link to={elem.route} className={classes.link}>
										<IconButton className={classes.iconButton} color='inherit' key={idx}>
											{elem.name}
										</IconButton>
									</Link>
								)
							})} */}
						</Toolbar>
					</AppBar>
				)
			}
		</UserContextConsumer>
	)
}

export default PrimaryAppBar
