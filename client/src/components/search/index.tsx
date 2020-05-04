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
	Divider,
	ExpansionPanelActions,
	Button,
	TextField,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchReducer from '../../reducers/SearchReducer'

import mainStyles from '../../styles'
import styles from './styles'

const searchReducer = new SearchReducer()

const Search: React.FC = () => {
	const classes = styles()
	const mainClasses = mainStyles()

	const [searchState, searchDispatch] = React.useReducer(searchReducer.reducer, { status: 'loading' })
	const scrollEl = useRef<HTMLDivElement>(null)
	const params = new URLSearchParams(window.location.search)

	const [lookingFor, setLookingFor] = React.useState(params.get('lookingfor'))
	const [interest, setInterest] = React.useState(params.get('interest'))

	const pagesToshow = 1

	useEffect(() => {
		console.log('location')
		console.log(window.location.search)
		scrollEl.current?.addEventListener('scroll', loadMore)
		searchReducer.searchUsers(searchDispatch, params.toString())
		return () => scrollEl.current?.removeEventListener('scroll', loadMore)
	}, [])

	const loadMore = () => {
		if (scrollEl.current) {
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
		console.log(window.location.protocol + window.location.host + '/search?' + params.toString())

		window.history.pushState({}, '', '/search?' + params.toString())
		searchReducer.searchUsers(searchDispatch, params.toString())
		// window.location.search = params.toString()
	}

	function valuetext(value: number) {
		return `${value}km`
	}

	return (
		// <Container>
		<div ref={scrollEl} className={mainClasses.rightScrollingContainer}>
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
								defaultValue={100}
								getAriaValueText={valuetext}
								aria-labelledby='discrete-slider'
								valueLabelDisplay='auto'
								step={100}
								marks
								min={100}
								max={500}
							/>
						</Grid>
						<Grid item xs={4}>
							<Typography id='discrete-slider' gutterBottom>
								LookingFor
							</Typography>
							<TextField
								type='text'
								fullWidth={true}
								value={lookingFor}
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
								value={interest}
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
						<ButtonBase focusRipple key={idx} className={classes.image} focusVisibleClassName={classes.focusVisible}>
							<span
								className={classes.imageSrc}
								style={{
									backgroundImage: `url(${user.avatarUrl ? user.avatarUrl?.thumbnail : '/images/noavatar.png'})`,
								}}
							/>
							<span className={classes.imageButton}>
								<Typography component='span' variant='subtitle1' color='inherit' className={classes.imageTitle}>
									{user.firstName + ' ' + user.lastName}
								</Typography>
							</span>
						</ButtonBase>
					))}
			</Box>
		</div>
		// </Container>
	)
}

export default Search
