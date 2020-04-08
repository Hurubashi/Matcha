import React from 'react'
import { Container, Card, Tooltip, Button, ButtonBase, Typography } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'

import galleryMakeStyles from './styles'

const images = [
	{
		url: '/images/av1.jpg',
	},
	// {
	// 	url: '/images/av2.jpg',
	// },
	// {
	// 	url: '/images/av3.jpg',
	// },
]

const Gallery: React.FC = () => {
	const classes = galleryMakeStyles()

	return (
		<Container>
			<Card className={classes.card}>
				<p style={{ textAlign: 'center' }}>Gallery</p>
				<ButtonBase focusRipple key='publish' className={classes.image}>
					<Tooltip title='Add new photo' aria-label='add'>
						<AddCircleOutlineIcon color='primary' fontSize='large' />
					</Tooltip>
				</ButtonBase>
				{images.map((image, idx) => (
					<ButtonBase key={idx} className={classes.image}>
						<span
							className={classes.imageSrc}
							style={{
								backgroundImage: `url(${image.url})`,
							}}
						/>
						<div className={`${classes.imageBackdrop} ${classes.imageSrc}`} />
						<Button key={idx} size='small' className={classes.thumbUp}>
							<ThumbUpAltIcon />
							<Typography component='span' variant='subtitle1' color='inherit' className={classes.thumbsCount}>
								{'66'}
							</Typography>
						</Button>
					</ButtonBase>
				))}
			</Card>
		</Container>
	)
}

export default Gallery
