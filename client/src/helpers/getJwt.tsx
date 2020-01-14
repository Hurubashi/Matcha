import Cookie from 'js-cookie'

export const getJwt = () => {
	console.log(Cookie.get('jwt'))
	return Cookie.get('jwt')
}
