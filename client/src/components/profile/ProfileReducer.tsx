import React from 'react'
import axios from 'axios'

type Gender = 'male' | 'female' | ''
type Preferences = 'male' | 'female' | 'male and female' | ''

export type ProfileData = {
	username: string
	email: string
	firstName: string
	lastName: string
	gender: Gender
	preferences: Preferences
	avatarUrl: string | undefined
	avatar: string | undefined
	interests: string[]
	biography: string
}

export type State =
	| { status: 'empty' }
	| { status: 'loading' }
	| { status: 'editing'; data: ProfileData }
	| { status: 'error'; error: string }
	| { status: 'success'; data: ProfileData }

export type Action =
	| { type: 'request' }
	| { type: 'success'; results: ProfileData }
	| { type: 'edit'; data: ProfileData }
	| { type: 'failure'; error: string }

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'request':
			return { status: 'loading' }
		case 'edit':
			return { status: 'editing', data: action.data }
		case 'success':
			return { status: 'success', data: action.results }
		case 'failure':
			return { status: 'error', error: action.error }
	}
}

export function fetchProfile(dispatch: React.Dispatch<Action>) {
	axios
		.get('/api/user/')
		.then(function (res) {
			if (res['data']['success'] === true) {
				dispatch({ type: 'success', results: res['data']['data'] })
			}
		})
		.catch(function (error) {
			dispatch({ type: 'failure', error })
		})
}

export function saveProfile(profile: ProfileData, dispatch: React.Dispatch<Action>) {
	axios
		.put('/api/user/', profile)
		.then(function (res) {
			if (res['data']['success'] === true) {
				dispatch({ type: 'success', results: res['data']['data'] })
			}
		})
		.catch(function (error) {
			dispatch({ type: 'failure', error })
		})
}

export default reducer
