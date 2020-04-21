import React from 'react'
import axios from 'axios'

type State =
	| { status: 'empty' }
	| { status: 'loading' }
	| { status: 'error'; error: string }
	| { status: 'success'; data: Image[] }

type Image = {
	id: number
	image: string
	likes: number
}

export type Action = { type: 'request' } | { type: 'success'; results: Image[] } | { type: 'failure'; error: string }

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
		.get('/image/')
		.then(function (res) {
			if (res['data']['success'] === true) {
				dispatch({ type: 'success', results: res['data']['data'] })
			}
		})
		.catch(function (error) {
			dispatch({ type: 'failure', error })
		})
}

export const uploadImage = (event: React.ChangeEvent<HTMLInputElement>, dispatch: React.Dispatch<Action>) => {
	const elem = event.target
	if (elem.files) {
		const fd = new FormData()
		fd.append('image', elem.files[0])
		axios
			.post('/image/', fd)
			.then(function (res) {
				if (res['data']['success'] === true) {
					fetchImages(dispatch)
				}
			})
			.catch(function (error) {
				dispatch({ type: 'failure', error })
			})
	}
}

export const deleteImage = (id: number, dispatch: React.Dispatch<Action>) => {
	axios
		.delete(`/image/${id}`)
		.then(function (res) {
			if (res['data']['success'] === true) {
				fetchImages(dispatch)
			}
		})
		.catch(function (error) {
			dispatch({ type: 'failure', error })
		})
}

export const setAvatar = (id: number, dispatch: React.Dispatch<Action>) => {
	console.log('avatar id: ' + id)
	axios
		.put('/user/', { avatar: id })
		.then(function (res) {
			if (res['data']['success'] === true) {
				console.log(res['data'])
			}
		})
		.catch(function (error) {
			console.log(error)
		})
}

export default reducer
