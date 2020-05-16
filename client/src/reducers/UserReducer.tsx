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
	heartsNumber: number
	birth: Date | string
	age: number
}

class UserReducer extends RequesReduser<User> {
	baseUrl = '/user'
	getUser(dispatch: React.Dispatch<Action<User>>, url?: string) {
		this.request(
			this.getReq(`/user/${url}`),
			(res) => {
				dispatch({
					type: 'success',
					results: { ...res['data']['data'], birth: this.formatDate(res['data']['data'].birth) },
				})
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
				dispatch({
					type: 'success',
					results: { ...res['data']['data'], birth: this.formatDate(res['data']['data'].birth) },
				})
				onSuccess()
			},
			(err) => {
				dispatch({ type: 'failure', error: err })
			},
		)
	}

	formatDate(date: string) {
		const d = new Date(date)
		const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
		const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(d)
		return `${ye}-${mo}-${da}`
	}

	getLocation(dispatch: React.Dispatch<Action<User>>, onSuccess: (lat: number, lon: number) => void) {
		const success = (position: Position) => {
			const latitude = position.coords.latitude
			const longitude = position.coords.longitude
			//   `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
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
		}

		if (!navigator.geolocation) {
			console.log('Geolocation is not supported by your browser')
		} else {
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

	giveHurt(dispatch: React.Dispatch<Action<User>>, user: User) {
		this.request(
			this.postReq({}, `/heart/${user.id}`),
			(res) => {
				if (res.data['success']) {
					dispatch({ type: 'success', results: { ...user, heartsNumber: user.heartsNumber + 1, heartIsGiven: true } })
				}
			},
			(err) => {
				dispatch({ type: 'failure', error: err })
			},
		)
	}

	returnHurt(dispatch: React.Dispatch<Action<User>>, user: User) {
		this.request(
			this.delReq(`/heart/${user.id}`),
			(res) => {
				if (res.data['success']) {
					dispatch({ type: 'success', results: { ...user, heartsNumber: user.heartsNumber - 1, heartIsGiven: false } })
				}
			},
			(err) => {
				dispatch({ type: 'failure', error: err })
			},
		)
	}
}

export default UserReducer
