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
	ListItemIcon,
	ListItemText,
} from '@material-ui/core/'

import {
	Menu as MenuIcon,
	Search as SearchIcon,
	AccountCircle,
	Mail as MailIcon,
	Notifications as NotificationsIcon,
	MoreVert as MoreIcon,
} from '@material-ui/icons/'

import axios from 'axios'
import { Link as ReactLink, Redirect } from 'react-router-dom'
import styles from './primaryAppBarStyles'
import { isUser } from '../../helpers/getJwt'

const useStyles = styles

export default function PrimaryAppBar() {
	const classes = useStyles()
	const [redirect, setRedirect] = React.useState<boolean>(false)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)

	const isMenuOpen = Boolean(anchorEl)
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
	const showUserMenus = isUser()

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	type DrawerSide = 'top' | 'left' | 'bottom' | 'right'
	const toggleDrawer = (side: DrawerSide, open: boolean) => (
		event: React.KeyboardEvent | React.MouseEvent,
	) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return
		}

		setState({ ...state, [side]: open })
	}

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
		handleMobileMenuClose()
	}

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget)
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

	const mobileMenuId = 'primary-search-account-menu-mobile'
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<IconButton aria-label='show 4 new mails' color='inherit'>
					<Badge badgeContent={4} color='secondary'>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label='show 11 new notifications' color='inherit'>
					<Badge badgeContent={11} color='secondary'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	)

	return (
		<div className={classes.grow}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						onClick={toggleDrawer('right', true)}>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant='h6' noWrap>
						Matcha
					</Typography>
					<SwipeableDrawer
						anchor='right'
						open={state.right}
						onClose={toggleDrawer('right', false)}
						onOpen={toggleDrawer('right', true)}>
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
					<div className={classes.sectionDesktop}>
						<IconButton aria-label='show 4 new mails' color='inherit'>
							<Badge badgeContent={4} color='secondary'>
								<MailIcon />
							</Badge>
						</IconButton>
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
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{/* {renderMobileMenu} */}
			{renderMenu}
		</div>
	)
}
