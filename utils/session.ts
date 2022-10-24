import cookieSignature from 'cookie-signature'
import type { CompatibilityEvent } from 'h3'

export function sign(value: string, secret: string) {
	return cookieSignature.sign(value, secret)
}

export function unsign(value: string, secret: string) {
	return cookieSignature.unsign(value, secret)
}

export async function getSession(event: CompatibilityEvent) {
	const app = useNitroApp()
	const config = useRuntimeConfig()

	const cookie = useCookies(event)[config.sessionCookieName]

	if (!cookie) return null

	const unsignedSession = unsign(cookie, config.sessionCookieSecret)

	if (!unsignedSession) return null

	const user = await app.session.get(config.sessionIdPrefix + unsignedSession)

	if (user) {
		// セッションクッキーの有効期限更新
		setCookie(event, config.sessionCookieName, cookie, {
			httpOnly: true,
			path: '/',
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			expires: new Date(Date.now() + config.sessionExpires * 1000)
		})

		// セッション情報の有効期限更新
		await app.session.touch(config.sessionIdPrefix + unsignedSession)
	}
	return user
}
