import React, { Reducer } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

// const reqConfig: AxiosRequestConfig = {
// 	url: '/image',
// 	method: 'GET',
// 	data: {},
// }
type State<T> = { status: 'loading' } | { status: 'error'; error: string } | { status: 'success'; data: T }

type Action<T> = { type: 'request' } | { type: 'success'; results: T } | { type: 'failure'; error: string }

export class RequesReduser<T> {
	reducer = (state: State<T>, action: Action<T>): State<T> => {
		switch (action.type) {
			case 'request':
				return { status: 'loading' }
			case 'success':
				return { status: 'success', data: action.results }
			case 'failure':
				return { status: 'error', error: action.error }
		}
	}

	request(reqConfig: AxiosRequestConfig, dispatch: React.Dispatch<Action<T>>) {
		axios(reqConfig)
			.then(function (res) {
				if (res['data']['success'] === true) {
					dispatch({ type: 'success', results: res['data']['data'] })
				}
			})
			.catch(function (error) {
				dispatch({ type: 'failure', error })
			})
	}
}
