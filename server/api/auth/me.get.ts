export default defineEventHandler(async (event) => {
	const user = event.context.user
	if (!user) {
		return {
			user: null
		}
	}

	return {
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role
		}
	}
})
