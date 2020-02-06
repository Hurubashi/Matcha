import React from 'react'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'

import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { Box, Container } from '@material-ui/core'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
// import tileData from './tileData';

import styles from '../../styles'

// interface Props {
//   user: string
// }
const useStyles = makeStyles(createStyles(styles))

const tileData = [
	{
		img: '/images/1.jpg',
		author: 'author',
		featured: true,
	},
	{
		img: '/images/2.jpg',

		author: 'author',
		featured: true,
	},
	{
		img: '/images/3.jpg',
		author: 'author',
		featured: true,
	},
	{
		img: '/images/4.jpg',
		author: 'author',
		featured: true,
	},
]

const Profile: React.FC = () => {
	const [value, setValue] = React.useState('female')
	const classes = useStyles()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value)
	}

	return (
		<Container>
			<Box className={classes.root}>
				<GridList cellHeight={200} spacing={5} className={classes.gridList}>
					{tileData.map(tile => (
						<GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
							<img src={tile.img} />
							<GridListTileBar
								titlePosition='top'
								actionIcon={
									<IconButton aria-label={`star`} className={classes.icon}>
										<StarBorderIcon />
									</IconButton>
								}
								actionPosition='left'
								className={classes.titleBar}
							/>
						</GridListTile>
					))}
				</GridList>
			</Box>

			<Box textAlign='center' marginTop='1em'>
				<FormControl component='fieldset'>
					<FormLabel component='legend'>Choose your Gender</FormLabel>
					<RadioGroup
						aria-label='position'
						name='position'
						value={value}
						onChange={handleChange}
						row>
						<FormControlLabel
							value='top'
							control={<Radio color='primary' />}
							label='Male'
							labelPlacement='top'
						/>
						<FormControlLabel
							value='bottom'
							control={<Radio color='primary' />}
							label='Female'
							labelPlacement='top'
						/>
						<FormControlLabel
							value='end'
							control={<Radio color='primary' />}
							label='Other'
							labelPlacement='top'
						/>
					</RadioGroup>
				</FormControl>
			</Box>

			<Box textAlign='center' marginTop='1em'>
				<FormControl component='fieldset'>
					<FormLabel component='legend'>Your sexual preference</FormLabel>
					<FormGroup aria-label='position' row>
						<FormControlLabel
							value='top'
							control={<Checkbox color='primary' />}
							label='Male'
							labelPlacement='top'
						/>
						<FormControlLabel
							value='bottom'
							control={<Checkbox color='primary' />}
							label='Female'
							labelPlacement='top'
						/>
					</FormGroup>
				</FormControl>
			</Box>

			<Box textAlign='center' marginTop='1em'>
				<TextField
					className={classes.text}
					id='outlined-multiline-static'
					label='Biography'
					multiline
					rows='8'
					variant='outlined'
				/>
			</Box>

			<Box textAlign='center' marginTop='1em'>
				<TextField
					className={classes.text}
					id='standart-multiline-static'
					label='Hash'
					multiline
					rows='1'
					//   variant="outlined"
					//   defaultValue="Hashs"
				/>
			</Box>
		</Container>
	)
}

export default Profile
