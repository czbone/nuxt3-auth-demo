import mongoose from 'mongoose'
import { userRoles } from './types/role'
const { roles } = userRoles()

const schema = new mongoose.Schema(
	{
		id: { type: Number, required: true, unique: true },
		email: { type: String, required: true, unique: true, trim: true },
		password: { type: String, required: true, trim: true },
		name: { type: String, required: true, unique: true, trim: true },
		role: {
			type: String,
			enum: roles,
			default: 'user'
		}
	},
	{ timestamps: true, strict: true, strictQuery: true }
)

schema.statics.getUserByEmail = async (email: string) => {
	const user = await User.findOne({ email: email })
	return user
}
schema.statics.getUserById = async (id: number) => {
	const user = await User.findOne({ id: id })
	return user
}
schema.statics.getUsers = async () => {
	const users = await User.find()
	return users
}

//schema.plugin(bcrypt)
const User = mongoose.model('User', schema, 'user' /* MongoDBのコレクション名 */)
export default User
