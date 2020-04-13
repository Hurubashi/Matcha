import React from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import galleryMakeStyles from './styles'

interface Props {
	id: string
}

const Edit: React.FC<Props> = (props: Props) => {
	const classes = galleryMakeStyles()

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const isMenuOpen = Boolean(anchorEl)

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const renderMenu = (
		<Menu
			PaperProps={{
				style: {
					border: '1px solid #d3d4d5',
				},
				onMouseLeave: handleMenuClose,
			}}
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			transformOrigin={{ vertical: 'top', horizontal: 'center' }}
			keepMounted
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem onClick={handleMenuClose}>Set as Avatar</MenuItem>
			<MenuItem onClick={handleMenuClose}>Remove</MenuItem>
		</Menu>
	)

	return (
		<Button
			key={'edit'}
			size='small'
			className={`${classes.iconButton} ${classes.edit}`}
			onClick={handleProfileMenuOpen}>
			<EditIcon />
			{renderMenu}
		</Button>
	)
}

export default Edit
