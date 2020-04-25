import RequesReduser, { Action } from './RequestReducer'

export type Image = {
	id: number
	image: string
	likes: number
}

class ImagesReducer extends RequesReduser<Image[]> {
	getImages(dispatch: React.Dispatch<Action<Image[]>>, url?: string) {
		this.request(this.getReq(url), dispatch)
	}

	uploadImage = (event: React.ChangeEvent<HTMLInputElement>, dispatch: React.Dispatch<Action<Image[]>>) => {
		const elem = event.target
		if (elem.files) {
			const fd = new FormData()
			fd.append('image', elem.files[0])
			this.request(this.postReq(fd), dispatch)
		}
	}

	deleteImage = (id: number, dispatch: React.Dispatch<Action<Image[]>>) => {
		this.request(this.delReq(`/${id}`), dispatch)
	}

	setAvatar = (id: number, dispatch: React.Dispatch<Action<Image[]>>) => {
		this.request(this.putReq({ avatar: id }), dispatch)
	}
}

export default new ImagesReducer('/image')
