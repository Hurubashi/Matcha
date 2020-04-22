import React from 'react'
import { AppBar, Toolbar, Typography, Badge, MenuItem, Box, Fab, Container, Button } from '@material-ui/core/'

import { Mail as MailIcon } from '@material-ui/icons/'

import axios from 'axios'
import appBarMakeStyles from './styles'
import ChatBox from '../chat'
import { isUser } from '../../helpers/getJwt'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'

const PrimaryAppBar: React.FC = () => {
	const classes = appBarMakeStyles()

	const [chat, setChat] = React.useState<boolean>(false)
	const [chatButton, setChatButton] = React.useState<boolean>(true)

	// const openChat = () => {
	// 	setChat(true)
	// 	setChatButton(false)
	// }

	// const closeChat = () => {
	// 	setChat(false)
	// 	setChatButton(true)
	// }

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

	const renderMenu = (
		<Box>
			<Link to='/profile' className={classes.link}>
				Profile
			</Link>
			<Link to='/gallery' className={classes.link}>
				Gallery
			</Link>
			{/* <MenuItem onClick={handleLogOut}>LogOut</MenuItem> */}
		</Box>
	)

	return (
		<Container className={classes.grow}>
			<AppBar position='static' className={classes.appBar}>
				<Toolbar>
					<Typography className={classes.title} variant='h6' noWrap>
						Matcha
					</Typography>
					{/* <Link to='/profile' className={classes.link}>
						Profile
					</Link> */}
					<div className={classes.grow} />
					<IconButton className={classes.iconButton} color='inherit'>
						<Link to='/gallery' className={classes.link}>
							Gallery
						</Link>
					</IconButton>
				</Toolbar>
			</AppBar>

			{/* {isUser() && chatButton && (
				<Fab color='primary' aria-label='add' className={classes.chatButton} onClick={openChat}>
					<Badge badgeContent={4} color='secondary'>
						<MailIcon />
					</Badge>
				</Fab>
			)}
			{isUser() && chat && <ChatBox closeChat={closeChat} />} */}
		</Container>
	)
}

export default PrimaryAppBar
