import React from 'react'
import axios from 'axios'

type State =
	| { status: 'empty' }
	| { status: 'loading' }
	| { status: 'error'; error: string }
	| { status: 'success'; data: Image[] }

type Image = {
	id: string
	image: string
	likes: number
}

type Action = { type: 'request' } | { type: 'success'; results: Image[] } | { type: 'failure'; error: string }

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'request':
			return { status: 'loading' }
		case 'success':
			return { status: 'success', data: action.results }
		case 'failure':
			return { status: 'error', error: action.error }
	}
}

export function fetchImages(dispatch: React.Dispatch<Action>) {
	axios
		.get('/api/gallery/me')
		.then(function (res) {
			if (res['data']['success'] === true) {
				console.log('IMAGES LOADED!!!!!!')
				dispatch({ type: 'success', results: res['data']['data'] })
				// setImages(res['data']['data'])
			}
		})
		.catch(function (error) {
			dispatch({ type: 'failure', error })
			// console.log(error.response['data']['msg'])
		})
}

export const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
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
				}
			})
			.catch(function (error) {
				console.log('Error catched')
				console.log(error.response)
			})
	}
}

export default reducer
