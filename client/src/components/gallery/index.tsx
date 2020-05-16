import React, { useEffect, useReducer } from 'react'
import { Container, Card, Tooltip, Button, Typography, Input } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ImagesReducer from '../../reducers/ImagesReducer'
import Edit from './Edit'
import galleryMakeStyles from './styles'

const imagesReducer = new ImagesReducer()

const Gallery: React.FC = () => {
	const classes = galleryMakeStyles()
	const [state, dispatch] = useReducer(imagesReducer.reducer, { status: 'loading' })

	useEffect(() => {
		imagesReducer.getImages(dispatch)
	}, [])

	return (
		<Container>
			{state.status === 'success' && (
				<Card className={classes.card}>
					<Typography align='center'>Gallery</Typography>
					<div className={classes.imagesContainer}>
						<div className={classes.image}>
							<Tooltip title='Add new photo' aria-label='add'>
								<Button className={classes.centered} size='small' component='label'>
									<Input
										type='file'
										style={{ display: 'none' }}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											imagesReducer.uploadImage(event, dispatch)
										}
									/>
									<AddCircleOutlineIcon color='primary' fontSize='large' />
								</Button>
							</Tooltip>
						</div>
						{state.data.map((image, idx) => (
							<div key={idx} className={classes.image}>
								<span
									className={classes.imageSrc}
									style={{
										backgroundImage: `url(${image.image.thumbnail})`,
									}}
								/>
								<div className={`${classes.imageBackdrop} ${classes.imageSrc}`} />
								<Edit id={image.id} dispatch={dispatch} />
							</div>
						))}
					</div>
				</Card>
			)}
		</Container>
	)
}

export default Gallery
