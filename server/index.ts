import Redis from 'ioredis'
import mongoose from 'mongoose'
import RedisSession from '~/utils/redis-session.js'
const config = useRuntimeConfig()

export default async (_nitroApp: Nitro) => {
	// 起動モード表示
	if (process.env.NODE_ENV === 'production') {
		console.log('=> Production mode starting')
	} else {
		console.log('=> Debug mode starting')
	}

	// セッション管理用のRedisクライアント作成
	const redis = new Redis(config.sessionRedisUrl)
	const redisSession = new RedisSession({ client: redis, ttl: config.sessionExpires })
	_nitroApp.session = redisSession

	// MongoDB初期接続
	try {
		mongoose.set('strictQuery', false)
		await mongoose.connect(config.mongoUrl)

		console.log('MongoDB connection established.')
	} catch (err) {
		console.error('MongoDB connection failed.', err)
	}
}
