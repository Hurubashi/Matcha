import React from 'react'
import axios, { AxiosRequestConfig } from 'axios'

export type State<T> = { status: 'loading' } | { status: 'error'; error: string } | { status: 'success'; data: T }

export type Action<T> = { type: 'request' } | { type: 'success'; results: T } | { type: 'failure'; error: string }

export default abstract class RequesReduser<T> {
	baseUrl: string
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

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
	protected request(
		reqConfig: AxiosRequestConfig,
		dispatch: React.Dispatch<Action<T>>,
		successCb: () => void = () => {},
		errorCb: () => void = () => {},
	) {
		axios(reqConfig)
			.then(function (res) {
				if (res['data']['success'] === true) {
					dispatch({ type: 'success', results: res['data']['data'] })
					successCb()
				} else {
					dispatch({ type: 'failure', error: res['data']['message'] })
					errorCb()
				}
			})
			.catch(function (error) {
				errorCb()
			})
	}

	protected getReq(url: string = ''): AxiosRequestConfig {
		return {
			url: this.baseUrl + url,
			method: 'GET',
		}
	}
	protected postReq(data: any, url: string = ''): AxiosRequestConfig {
		return {
			url: this.baseUrl + url,
			method: 'POST',
			data: data,
		}
	}
	protected putReq(data: any, url: string = ''): AxiosRequestConfig {
		return {
			url: this.baseUrl + url,
			method: 'PUT',
			data: data,
		}
	}
	protected delReq(url: string = ''): AxiosRequestConfig {
		return {
			url: this.baseUrl + url,
			method: 'DELETE',
		}
	}
}
