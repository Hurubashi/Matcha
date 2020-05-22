import Cookie from 'js-cookie'

export class CookieManager {
	// Consts for cookie names
	private static AUTHORIZED = 'authorized'

	static isAuthorized(): boolean {
		if (Cookie.get('user') === CookieManager.AUTHORIZED) return true
		else return false
	}

	static setAuthorized(status: boolean): void {
		if (status) Cookie.set('user', CookieManager.AUTHORIZED, { sameSite: 'strict' })
		else Cookie.remove('user')
	}
}
