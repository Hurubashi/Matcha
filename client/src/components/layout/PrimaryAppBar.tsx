import React from 'react'
import { AppBar, Toolbar, Typography, Menu, Avatar, IconButton, Hidden } from '@material-ui/core/'

import axios from 'axios'
import appBarMakeStyles from './styles'
import { Link } from 'react-router-dom'
import { UserContextConsumer } from '../../helpers/UserContextProvider'
import ChatIcon from '@material-ui/icons/Chat'
import { Button } from '@material-ui/core'
import { CookieManager } from '../../helpers/CoookieManager'

interface Props {
	setMobileChatlist: React.Dispatch<React.SetStateAction<boolean>>
}

const PrimaryAppBar: React.FC<Props> = (props: Props) => {
	const classes = appBarMakeStyles()
	const { setMobileChatlist } = props
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
				CookieManager.setAuthorized(false)
				window.location.reload()
			})
			.catch(function (error) {
				// props.setErrors({ username: error })
			})
	}

	const menuList = (
		<UserContextConsumer>
			{(ctx) =>
				ctx?.state.status === 'success' && (
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<Link to='/search' className={classes.link} onClick={handleClose}>
							<Button className={classes.iconButton} color='inherit'>
								{'Search'}
							</Button>
						</Link>
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
						<Button className={classes.iconButton} color='inherit' onClick={handleLogOut}>
							{'Exit'}
						</Button>
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
							<Hidden mdUp>
								<IconButton onClick={() => setMobileChatlist(true)}>
									<ChatIcon />
								</IconButton>
							</Hidden>
							<Link to='/search' className={classes.link}>
								<Typography variant='h3'>Matcha</Typography>
							</Link>
							<div className={classes.grow} />
							<div onClick={handleClick}>
								<Avatar alt='Avatar' src={ctx.state.data.avatar?.thumbnail} style={{ cursor: 'pointer' }} />
							</div>
							<Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
								{menuList}
							</Menu>
						</Toolbar>
					</AppBar>
				)
			}
		</UserContextConsumer>
	)
}

export default PrimaryAppBar
