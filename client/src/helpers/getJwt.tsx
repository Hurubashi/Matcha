import Cookie from 'js-cookie'

export const getJwt = () => {
	return Cookie.get('jwt')
}
