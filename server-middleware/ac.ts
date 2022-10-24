export default defineEventHandler(async (event) => {
	const user = event.context.user

	// 管理用APIの場合は管理権限を確認する
	if (event.req.originalUrl.indexOf('/api/admin/') === 0) {
		if (!(user && user.role === 'admin')) {
			sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated' }))
		}
	}
})
