import React from 'react'
import { AppBar, Toolbar, Typography, Card, Hidden } from '@material-ui/core/'

import axios from 'axios'
import appBarMakeStyles from './styles'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import { UserContextConsumer } from '../../helpers/UserContextProvider'
import SettingsIcon from '@material-ui/icons/Settings'
import MenuIcon from '@material-ui/icons/Menu'
import ChatIcon from '@material-ui/icons/Chat'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

const PrimaryAppBar: React.FC = () => {
	const classes = appBarMakeStyles()

	const [modal, setModal] = React.useState<boolean>(false)

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

	const menuList = (
		<UserContextConsumer>
			{(ctx) =>
				ctx?.state.status === 'success' && (
					<Card style={{ display: 'flex', flexDirection: 'column' }}>
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
								Settings
							</IconButton>
						</Link>
					</Card>
				)
			}
		</UserContextConsumer>
	)
	return (
		<UserContextConsumer>
			{(ctx) =>
				ctx?.state.status === 'success' && (
					<AppBar position='static' className={classes.appBar}>
						<Toolbar>
							<ChatIcon style={{ marginRight: '1em' }} />
							<Typography variant='h3'>Matcha</Typography>
							<div className={classes.grow} />
							<Hidden mdUp>
								<MenuIcon onClick={() => setModal(true)} />

								<Modal
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
									aria-labelledby='transition-modal-title'
									aria-describedby='transition-modal-description'
									open={modal}
									onClose={() => setModal(false)}
									closeAfterTransition
									BackdropComponent={Backdrop}
									BackdropProps={{
										timeout: 500,
									}}>
									<Fade in={modal}>{menuList}</Fade>
								</Modal>
							</Hidden>

							<Hidden smDown>{menuList}</Hidden>
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
