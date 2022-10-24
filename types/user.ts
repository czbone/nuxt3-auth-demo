export interface User {
	id: string
	email: string
	name: string
	password: string
	role: string
}

export type UserWithoutPassword = Omit<User, 'password'>
