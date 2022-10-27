import { unsign } from '~/utils/session'

export default defineEventHandler(async (event) => {
	const app = useNitroApp()
	const config = useRuntimeConfig()

	// セッションID取得
	const cookie = useCookies(event)[config.sessionCookieName]
	if (cookie) {
		const unsignedSession = unsign(cookie, config.sessionCookieSecret)
		if (unsignedSession) {
			// セッション破棄
			await app.session.destroy(config.sessionIdPrefix + unsignedSession)
		}
	}

	// クッキー破棄
	deleteCookie(event, config.sessionCookieName, {
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production'
	})

	return {
		user: null
	}
})
