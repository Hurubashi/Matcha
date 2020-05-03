import RequesReduser, { Action } from './RequestReducer'

export type Image = {
	id: number
	image: string
	likes: number
}

class ImagesReducer extends RequesReduser<Image[]> {
	baseUrl = '/image'
	getImages(dispatch: React.Dispatch<Action<Image[]>>, url?: string) {
		this.requestDefault(this.getReq(), dispatch)
	}

	uploadImage = (event: React.ChangeEvent<HTMLInputElement>, dispatch: React.Dispatch<Action<Image[]>>) => {
		const elem = event.target
		if (elem.files) {
			const fd = new FormData()
			fd.append('image', elem.files[0])
			console.log('upload image')
			this.request(
				this.postReq(fd),
				() => {
					this.getImages(dispatch)
				},
				(err) => {
					dispatch({ type: 'failure', error: err })
				},
			)
		}
	}

	deleteImage = (id: number, dispatch: React.Dispatch<Action<Image[]>>) => {
		this.request(
			this.delReq(`/image/${id}`),
			() => {
				this.getImages(dispatch)
			},
			(err) => {
				dispatch({ type: 'failure', error: err })
			},
		)
	}

	setAvatar = (id: number, dispatch: React.Dispatch<Action<Image[]>>) => {
		this.request(
			this.putReq({ avatar: id }, '/user'),
			() => {
				this.getImages(dispatch)
			},
			(err) => {
				dispatch({ type: 'failure', error: err })
			},
		)
	}
}

export default ImagesReducer
