import Cookie from 'js-cookie'

export const isUser = (): boolean => {
	if (Cookie.get('jwt')) return true
	else return false
}
