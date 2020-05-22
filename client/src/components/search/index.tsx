import React, { useEffect, useRef } from 'react'
import {
	Box,
	ButtonBase,
	Typography,
	Slider,
	Grid,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	ExpansionPanelActions,
	Button,
	TextField,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchReducer from '../../reducers/SearchReducer'
import { Link } from 'react-router-dom'
import styles from './styles'

const searchReducer = new SearchReducer()

const Search: React.FC = () => {
	const classes = styles()

	const [searchState, searchDispatch] = React.useReducer(searchReducer.reducer, { status: 'loading' })
	const scrollEl = useRef<HTMLDivElement>(null)
	const params = new URLSearchParams(window.location.search)

	const [lookingFor, setLookingFor] = React.useState(params.get('lookingfor'))
	const [interest, setInterest] = React.useState(params.get('interest'))
	const [distance, setDistance] = React.useState(Number(params.get('distance')) || 10)

	// const pagesToshow = 1

	useEffect(() => {
		const current = scrollEl.current
		current?.addEventListener('scroll', loadMore)
		searchReducer.searchUsers(searchDispatch, window.location.search)
		return () => current?.removeEventListener('scroll', loadMore)
	}, [])

	const loadMore = () => {
		if (scrollEl.current) {
			console.log(scrollEl.current.scrollHeight)

			const scrollHeight = scrollEl.current.scrollHeight
			const scrollTop = scrollEl.current.scrollTop + scrollEl.current.offsetHeight
			if (scrollHeight === scrollTop) {
				console.log('load more')
			}
		}
	}

	function changeLocation() {
		if (lookingFor) {
			params.set('lookingfor', lookingFor)
		} else {
			params.delete('lookingfor')
		}
		if (interest) {
			params.set('interest', interest)
		} else {
			params.delete('interest')
		}
		if (distance) {
			params.set('distance', String(distance))
		} else {
			params.delete('distance')
		}
		window.history.pushState({}, '', '/search?&' + params.toString())
		searchReducer.searchUsers(searchDispatch, window.location.search)
	}

	function valuetext(value: number) {
		return `${value}km`
	}
	const changeDist = (num: number) => {
		setDistance(num)
	}
	return (
		<div ref={scrollEl}>
			<ExpansionPanel className={classes.searchFiltersContainer}>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
					aria-controls='panel1a-content'
					id='panel1a-header'
					style={{ flexDirection: 'initial' }}>
					<Typography style={{ width: '100%', textAlign: 'right' }}>Search options</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Typography id='discrete-slider' gutterBottom>
								Distance
							</Typography>
							<Slider
								value={distance}
								getAriaValueText={valuetext}
								aria-labelledby='discrete-slider'
								valueLabelDisplay='auto'
								onChange={(e, val) => changeDist(Number(val))}
								min={10}
								max={1000}
							/>
						</Grid>
						<Grid item xs={4}>
							<Typography id='discrete-slider' gutterBottom>
								LookingFor
							</Typography>
							<TextField
								type='text'
								fullWidth={true}
								value={lookingFor ? lookingFor : ''}
								onChange={(e) => setLookingFor(e.currentTarget.value)}
							/>
						</Grid>
						<Grid item xs={4}>
							<Typography id='discrete-slider' gutterBottom>
								Interest
							</Typography>
							<TextField
								type='text'
								fullWidth={true}
								value={interest ? interest : ''}
								onChange={(e) => setInterest(e.currentTarget.value)}
							/>
						</Grid>
					</Grid>
					<ExpansionPanelActions>
						<Button size='small' variant='outlined' onClick={changeLocation}>
							Search
						</Button>
					</ExpansionPanelActions>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<Box className={`${classes.root}`}>
				{searchState.status === 'success' &&
					searchState.data.map((user, idx) => (
						<ButtonBase
							focusRipple
							key={'user' + idx}
							className={classes.image}
							focusVisibleClassName={classes.focusVisible}>
							<Link to={user.username}>
								<span
									className={classes.imageSrc}
									style={{
										backgroundImage: `url(${
											user.avatar ? user.avatar?.thumbnail : `/images/noavatar${user.gender}.jpg`
										})`,
									}}
								/>
								<span className={classes.imageButton}>
									<Typography component='span' variant='subtitle1' color='inherit' className={classes.imageTitle}>
										{user.firstName + ' ' + user.lastName}
									</Typography>
								</span>
							</Link>
						</ButtonBase>
					))}
				{searchState.status === 'loading' &&
					[...Array(9)].map((e, i) => (
						<Skeleton key={'skel' + i} variant='rect' className={classes.image} style={{ backgroundColor: 'gray' }} />
					))}
			</Box>
		</div>
	)
}

export default Search
