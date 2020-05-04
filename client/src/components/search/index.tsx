import React, { useEffect, useRef } from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import { Box, Container } from '@material-ui/core'

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

	useEffect(() => {
		console.log(params.get('range'))
		params.set('range', '200')
		console.log(scrollEl.current)
		scrollEl.current?.addEventListener('scroll', loadMore)

		searchReducer.searchUsers(searchDispatch, params.toString())
		// console.log((window.location.search = params.toString()))w
		return () => scrollEl.current?.removeEventListener('scroll', loadMore)
	}, [window.location.search])

	const loadMore = () => {
		if (scrollEl.current) {
			const scrollHeight = scrollEl.current.scrollHeight
			const scrollTop = scrollEl.current.scrollTop + scrollEl.current.offsetHeight
			if (scrollEl.current.scrollHeight === scrollTop) {
				console.log('load more')
			}
		}

		// if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
		// 	// Do load more content here!
		// }
	}

	return (
		// <Container>
		<div ref={scrollEl} className={mainClasses.rightScrollingContainer}>
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
							{/* <span className={classes.imageBackdrop} /> */}
							<span className={classes.imageButton}>
								<Typography component='span' variant='subtitle1' color='inherit' className={classes.imageTitle}>
									{user.firstName + ' ' + user.lastName}
									{/* <span className={classes.imageMarked} /> */}
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
