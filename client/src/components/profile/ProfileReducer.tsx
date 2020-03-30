import { useReducer } from 'react'
import { ProfileData, Gender, Preferences } from './ProfileInterface'

type State = {
	data: ProfileData
	isLoading: boolean
	error?: string
}

type Action =
	| { type: 'request'; results: ProfileData }
	| { type: 'success'; results: ProfileData }
	| { type: 'failure'; error: string; results: ProfileData }

export const reducer = (state: State, action: Action): State => {
	console.log('reducer func')
	switch (action.type) {
		case 'request':
			return { isLoading: true, data: action.results }
		case 'success':
			return { isLoading: false, data: action.results }
		case 'failure':
			return { isLoading: false, error: action.error, data: action.results }
	}
}

export const initialState = {
	isLoading: true,
	data: {
		username: '',
		email: '',
		firstName: '',
		lastName: '',
		gender: '' as Gender,
		preferences: '' as Preferences,
		interests: [],
		biography: '',
	},
}
