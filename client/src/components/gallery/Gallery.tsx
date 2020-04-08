import React from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import { Box, Container, Card } from '@material-ui/core'

import galleryMakeStyles from './styles'

const images = [
	{
		url: '/images/av1.jpg',
	},
	{
		url: '/images/av2.jpg',
	},
	{
		url: '/images/av3.jpg',
	},
	{
		url: '/images/av1.jpg',
	},
	{
		url: '/images/av2.jpg',
	},
]

const Gallery: React.FC = () => {
	const classes = galleryMakeStyles()

	return (
		<Container>
			<Card className={classes.card}>
				{images.map((image, idx) => (
					<ButtonBase
						focusRipple
						key={idx}
						className={classes.image}
						focusVisibleClassName={classes.focusVisible}
						style={{
							width: '33.3%',
						}}>
						<span
							className={classes.imageSrc}
							style={{
								backgroundImage: `url(${image.url})`,
							}}
						/>
						<span className={classes.imageBackdrop} />
						<span className={classes.imageButton}>
							<Typography component='span' variant='subtitle1' color='inherit' className={classes.imageTitle}>
								{'User'}
								{/* <span className={classes.imageMarked} /> */}
							</Typography>
						</span>
					</ButtonBase>
				))}
			</Card>
		</Container>
	)
}

export default Gallery
