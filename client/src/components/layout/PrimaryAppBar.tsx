import React from 'react'
import { AppBar, Toolbar, Typography, Card, Hidden, Menu, MenuItem, Avatar } from '@material-ui/core/'

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
import { Button } from '@material-ui/core'
import { CookieManager } from '../../helpers/CoookieManager'

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

const PrimaryAppBar: React.FC = () => {
	const classes = appBarMakeStyles()

	const [modal, setModal] = React.useState<boolean>(false)

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogOut = () => {
		setAnchorEl(null)
		axios
			.post('/api/auth/logout')
			.then(function (res) {
				console.log(res)
				CookieManager.setAuthorized(false)
				window.location.reload()
			})
			.catch(function (error) {
				console.log(error)
				// props.setErrors({ username: error })
			})
	}

	const menuList = (
		<UserContextConsumer>
			{(ctx) =>
				ctx?.state.status === 'success' && (
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<Link to={ctx.state.data.username} className={classes.link} onClick={handleClose}>
							<Button className={classes.iconButton} color='inherit'>
								{'My profile'}
							</Button>
						</Link>
						<Link to='/profile' className={classes.link} onClick={handleClose}>
							<Button className={classes.iconButton} color='inherit'>
								{'Settings'}
							</Button>
						</Link>
						{/* <Link to='/login' className={classes.link} onClick={handleClose}> */}
						<Button className={classes.iconButton} color='inherit' onClick={handleLogOut}>
							{'Exit'}
						</Button>
						{/* </Link> */}
					</div>
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
							<div onClick={handleClick}>
								<Avatar alt='Avatar' src={ctx.state.data.avatar?.thumbnail} />
							</div>
							<Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
								{menuList}
								{/* <MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
								<MenuItem onClick={handleClose}>Logout</MenuItem> */}
							</Menu>
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
