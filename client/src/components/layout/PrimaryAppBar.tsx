import React from 'react'
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	InputBase,
	Badge,
	SwipeableDrawer,
	MenuItem,
	Menu,
	List,
	ListItem,
	Box,
	ListItemText,
	Fab,
} from '@material-ui/core/'

import {
	Menu as MenuIcon,
	Search as SearchIcon,
	AccountCircle,
	Mail as MailIcon,
	// Notifications as NotificationsIcon,
	// MoreVert as MoreIcon,
} from '@material-ui/icons/'

import axios from 'axios'
import { Link as ReactLink, Redirect } from 'react-router-dom'
import styles from './primaryAppBarStyles'
import ChatBox from '../chat/ChatBox'
import { isUser } from '../../helpers/getJwt'

const useStyles = styles

export default function PrimaryAppBar() {
	const classes = useStyles()
	const [redirect, setRedirect] = React.useState<boolean>(false)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const [chat, setChat] = React.useState<boolean>(false)
	const [chatButton, setChatButton] = React.useState<boolean>(true)

	const isMenuOpen = Boolean(anchorEl)
	const showUserMenus = isUser()

	const [state, setState] = React.useState({
		left: false,
	})

	type DrawerSide = 'left'
	const toggleDrawer = (side: DrawerSide, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
		) {
			return
		}

		setState({ ...state, [side]: open })
	}

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const openChat = () => {
		setChat(true)
		setChatButton(false)
	}

	const closeChat = () => {
		setChat(false)
		setChatButton(true)
	}

	if (redirect) return <Redirect to='/login' />

	const handleLogOut = () => {
		axios
			.post('/api/auth/logout')
			.then(function(res) {
				setRedirect(true)
			})
			.catch(function(error) {
				// props.setErrors({ username: error })
			})
	}

	const menuId = 'primary-search-account-menu'
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<ReactLink to='/profile'>
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			</ReactLink>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
			<MenuItem onClick={handleLogOut}>LogOut</MenuItem>
		</Menu>
	)

	return (
		<Box className={classes.grow}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						edge='start'
						className={`${classes.menuButton} ${classes.sectionMobile}`}
						color='inherit'
						onClick={toggleDrawer('left', true)}>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant='h6' noWrap>
						Matcha
					</Typography>
					<SwipeableDrawer
						anchor='left'
						open={state.left}
						onClose={toggleDrawer('left', false)}
						onOpen={toggleDrawer('left', true)}>
						<List className={classes.list}>
							<ListItem button>
								<ListItemText primary={'sss'} />
							</ListItem>
						</List>
					</SwipeableDrawer>
					{showUserMenus && (
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search…'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
							/>
						</div>
					)}
					<div className={classes.grow} />
					{showUserMenus && (
						<div className={classes.sectionDesktop}>
							<IconButton
								edge='end'
								aria-label='account of current user'
								aria-controls={menuId}
								aria-haspopup='true'
								onClick={handleProfileMenuOpen}
								color='inherit'>
								<AccountCircle />
							</IconButton>
						</div>
					)}
				</Toolbar>
			</AppBar>
			{showUserMenus && chatButton && (
				<Fab color='primary' aria-label='add' className={classes.chatButton} onClick={openChat}>
					<Badge badgeContent={4} color='secondary'>
						<MailIcon />
					</Badge>
				</Fab>
			)}
			{showUserMenus && chat && <ChatBox closeChat={closeChat} />}

			{renderMenu}
		</Box>
	)
}
