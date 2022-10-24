import type { UserWithoutPassword } from '~/types/user'

export const useAuthUser = () => {
	return useState<UserWithoutPassword | null>('user', () => null)
}
