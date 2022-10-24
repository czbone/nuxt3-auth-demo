import { User } from '~/models'

export default defineEventHandler(async (event) => {
	try {
		const usersData = await User.find()
		return usersData.map((user) => ({
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role
		}))
	} catch (err) {
		event.res.statusCode = 500
		return {
			code: 'ERROR',
			message: 'Something went wrong.'
		}
	}
})
