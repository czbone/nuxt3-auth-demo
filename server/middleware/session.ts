import { getSession } from '~/utils/session'

export default defineEventHandler(async (event) => {
	// セッションからユーザ情報取得
	const user = await getSession(event)

	if (user) event.context.user = user
})
