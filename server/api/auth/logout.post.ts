import { unsign } from '~/utils/session'

export default defineEventHandler(async (event) => {
	const app = useNitroApp()
	const config = useRuntimeConfig()

	// delete session
	const cookie = useCookies(event)[config.sessionCookieName]
	if (cookie) {
		const unsignedSession = unsign(cookie, config.sessionCookieSecret)
		if (unsignedSession) {
			await app.session.destroy(config.sessionIdPrefix + unsignedSession)
		}
	}

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
