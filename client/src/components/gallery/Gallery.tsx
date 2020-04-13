import React, { useEffect, useState } from 'react'
import { Container, Card, Tooltip, Button, Typography, Input, Menu, MenuItem, Box } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import EditIcon from '@material-ui/icons/Edit'
import axios from 'axios'

import Edit from './Edit'
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
	id: string
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
				<Typography align='center'>Gallery</Typography>
				<div className={classes.image}>
					<Tooltip title='Add new photo' aria-label='add'>
						<Button className={classes.centered} size='small' component='label'>
							<Input type='file' style={{ display: 'none' }} onChange={uploadFile} />
							<AddCircleOutlineIcon color='primary' fontSize='large' />
						</Button>
					</Tooltip>
				</div>
				{images.map((image, idx) => (
					<div key={idx} className={classes.image} id={image.id}>
						<span
							className={classes.imageSrc}
							style={{
								backgroundImage: `url(${image.image})`,
							}}
						/>

						<div className={`${classes.imageBackdrop} ${classes.imageSrc}`} />
						<Edit id={image.id} />
						<Button key={idx} size='small' className={`${classes.iconButton} ${classes.thumbUp}`}>
							<ThumbUpAltIcon />
							<Typography component='span' variant='subtitle1' color='inherit' className={classes.thumbsCount}>
								{image.likes}
							</Typography>
						</Button>
					</div>
				))}
			</Card>
		</Container>
	)
}

export default Gallery
