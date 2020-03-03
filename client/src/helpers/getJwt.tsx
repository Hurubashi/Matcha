import Cookie from 'js-cookie'

export const getJwt = () => {
	return Cookie.get('jwt')
}

export const isUser = (): boolean => {
	if (Cookie.get('jwt')) return true
	else return false
}
