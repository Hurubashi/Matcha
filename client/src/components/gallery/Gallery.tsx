import React, { useEffect, useState } from 'react'
import { Container, Card, Tooltip, Button, ButtonBase, Typography, Input } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import axios from 'axios'

import galleryMakeStyles from './styles'

// const images = [
// 	{
// 		url: '/images/av1.jpg',
// 	},
// 	// {
// 	// 	url: '/images/av2.jpg',
// 	// },
// 	// {
// 	// 	url: '/images/av3.jpg',
// 	// },
// ]
interface Image {
	image: string
	likes: number
}
const Gallery: React.FC = () => {
	const classes = galleryMakeStyles()
	const [refresh, setRefresh] = useState<boolean>(false)
	const [images, setImages] = useState<Image[]>([])

	useEffect(() => {
		axios
			.get('/api/gallery/me')
			.then(function (res) {
				if (res['data']['success'] === true) {
					setImages(res['data']['data'])
				}
			})
			.catch(function (error) {
				// alert(error)
				console.log(error.response['data']['msg'])
			})
	}, [refresh])

	const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const elem = event.target
		if (elem.files) {
			console.log(elem.files[0])
			let fd = new FormData()
			fd.append('image', elem.files[0])
			axios
				.post('/api/gallery/me', fd)
				.then(function (res) {
					if (res['data']['success'] === true) {
						console.log('uccess')
						console.log(res['data'])
						setRefresh(!refresh)
					}
				})
				.catch(function (error) {
					console.log('Error catched')
					console.log(error.response)
				})
		}
	}

	return (
		<Container>
			<Card className={classes.card}>
				<p style={{ textAlign: 'center' }}>Gallery</p>
				<Button className={classes.image} component='label'>
					<Input type='file' style={{ display: 'none' }} onChange={uploadFile} />
					<Tooltip title='Add new photo' aria-label='add'>
						<AddCircleOutlineIcon color='primary' fontSize='large' />
					</Tooltip>
				</Button>
				{images.map((image, idx) => (
					<ButtonBase key={idx} className={classes.image}>
						<span
							className={classes.imageSrc}
							style={{
								backgroundImage: `url(${image.image})`,
							}}
						/>
						<div className={`${classes.imageBackdrop} ${classes.imageSrc}`} />
						<Button key={idx} size='small' className={classes.thumbUp}>
							<ThumbUpAltIcon />
							<Typography component='span' variant='subtitle1' color='inherit' className={classes.thumbsCount}>
								{image.likes}
							</Typography>
						</Button>
					</ButtonBase>
				))}
			</Card>
		</Container>
	)
}

export default Gallery
