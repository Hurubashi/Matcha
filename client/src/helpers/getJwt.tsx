import Cookie from 'js-cookie'

export const isUser = (): boolean => {
	if (Cookie.get('user')) return true
	else return false
}
