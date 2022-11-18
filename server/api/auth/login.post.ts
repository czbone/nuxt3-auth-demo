import { v4 as uuidv4 } from 'uuid'
import { User } from '~/models'
import { verify } from '~/utils/password'
import { sign } from '~/utils/session'

export default defineEventHandler(async (event) => {
	const body = await readBody<{ email: string; password: string; rememberMe: boolean }>(event)

	const { email, password, rememberMe } = body

	if (!email || !password) {
		return createError({
			statusCode: 400,
			message: 'Email address and password are required'
		})
	}

	// ユーザ情報取得
	const userWithPassword = await User.getUserByEmail(email)
	if (!userWithPassword) {
		return createError({
			statusCode: 401,
			message: 'Bad credentials'
		})
	}

	// ユーザ認証
	const verified = await verify(password, userWithPassword.password)
	if (!verified) {
		return createError({
			statusCode: 401,
			message: 'Bad credentials'
		})
	}

	// セッションID作成
	const config = useRuntimeConfig()
	const sessionId = uuidv4()
	const signedSessionId = sign(sessionId, config.sessionCookieSecret)

	// クッキー作成
	setCookie(event, config.sessionCookieName, signedSessionId, {
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		expires: new Date(Date.now() + config.sessionExpires * 1000)
	})

	// セッション作成
	const app = useNitroApp()
	await app.session.set(config.sessionIdPrefix + sessionId, {
		id: userWithPassword.id,
		email: userWithPassword.email,
		name: userWithPassword.name,
		role: userWithPassword.role
	})

	return {
		user: {
			id: userWithPassword.id,
			email: userWithPassword.email,
			name: userWithPassword.name,
			role: userWithPassword.role
		}
	}
})
