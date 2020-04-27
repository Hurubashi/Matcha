import RequesReduser, { Action } from './RequestReducer'

type Gender = 'male' | 'female' | ''
type Preferences = 'male' | 'female' | 'male and female'

export type User = {
	username: string
	email: string
	firstName: string
	lastName: string
	gender: Gender
	preferences: Preferences
	avatarUrl: string | undefined
	avatar: string | undefined
	lookingFor: string[]
	interests: string[]
	biography: string
	lat: number
	lon: number
}

class UserReducer extends RequesReduser<User> {
	getUser(dispatch: React.Dispatch<Action<User>>, url?: string) {
		this.requestDefault(this.getReq(`/user/${url}`), dispatch)
	}

	saveUser(data: User, dispatch: React.Dispatch<Action<User>>, onSuccess: () => void) {
		this.request(
			this.putReq(data),
			(res) => {
				dispatch({ type: 'success', results: res['data']['data'] })
				onSuccess()
			},
			(err) => {
				dispatch({ type: 'failure', error: err })
			},
		)
	}

	getLocation(dispatch: React.Dispatch<Action<User>>, onSuccess: (lat: number, lon: number) => void) {
		const success = (position: Position) => {
			const latitude = position.coords.latitude
			const longitude = position.coords.longitude

			//   `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
			console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`)
			this.request(
				this.putReq({ lat: latitude, lon: longitude }),
				(res) => {
					onSuccess(latitude, longitude)
				},
				(err) => {
					dispatch({ type: 'failure', error: err })
				},
			)
		}

		const error = (positionError: PositionError) => {
			console.log('PositionError:' + positionError.message)
			console.log('Unable to retrieve your location')
		}

		if (!navigator.geolocation) {
			console.log('Geolocation is not supported by your browser')
		} else {
			//   status.textContent = 'Locating…';
			console.log(navigator.geolocation.getCurrentPosition(success, error))
		}
	}
}

export default new UserReducer('/user')
