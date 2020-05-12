import RequesReduser, { Action } from './RequestReducer'

type Gender = 'male' | 'female' | ''
type Preferences = 'male' | 'female' | 'male and female'

export type User = {
	id: number
	username: string
	email: string
	firstName: string
	lastName: string
	gender: Gender
	preferences: Preferences
	avatar?:
		| {
				thumbnail: string
				normal: string
		  }
		| undefined
	lookingFor: string[]
	interests: string[]
	biography: string
	lat: number
	lon: number
	heartIsGiven: boolean
}

class UserReducer extends RequesReduser<User> {
	baseUrl = '/user'
	getUser(dispatch: React.Dispatch<Action<User>>, url?: string) {
		this.request(
			this.getReq(`/user/${url}`),
			(res) => {
				dispatch({ type: 'success', results: res['data']['data'] })
			},
			(err) => {
				dispatch({ type: 'failure', error: err })
			},
		)
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

	getDistanse(lat1: number, lon1: number, lat2: number, lon2: number): number {
		const R = 6371e3 // metres
		const φ1 = (lat1 * Math.PI) / 180 // φ, λ in radians
		const φ2 = (lat2 * Math.PI) / 180
		const Δφ = ((lat2 - lat1) * Math.PI) / 180
		const Δλ = ((lon2 - lon1) * Math.PI) / 180

		const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

		const d = Math.round(((R * c) / 1000 + Number.EPSILON) * 100) / 100 // in km
		return d
	}
}

export default UserReducer
