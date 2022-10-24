module.exports = class RedisSession {
  constructor(options = {}) {
    this.prefix = ""
    this.scanCount = Number(options.scanCount) || 100
    this.serializer = options.serializer || JSON
    this.client = options.client
    this.ttl = options.ttl || 1800 // 30 minutes
    this.disableTTL = options.disableTTL || false
    this.disableTouch = options.disableTouch || false
  }

  async get(sid) {
    let key = this.prefix + sid

    let data = await this.client.get(key)
    if (!data) return null

    let value
    try {
      value = this.serializer.parse(data)
    } catch (err) {
      return null
    }
    return value
  }

  async set(sid, sess) {
    let args = [this.prefix + sid]

    let value
    try {
      value = this.serializer.stringify(sess)
    } catch (er) {
      return null
    }
    args.push(value)

    let ttl = 1
    if (!this.disableTTL) {
      ttl = this._getTTL(sess)
      args.push("EX", ttl)
    }

    if (ttl > 0) {
      return await this.client.set(args)
    } else {
      // If the resulting TTL is negative we can delete / destroy the key
      return await this.destroy(sid)
    }
  }

  async touch(sid, sess) {
    if (this.disableTouch || this.disableTTL) return null

    let key = this.prefix + sid
    let err = await this.client.expire(key, this._getTTL(sess))
    return err
  }

  async destroy(sid) {
    let key = this.prefix + sid
    let err = await this.client.del(key)
    return err
  }

  async clear() {
    let keys = await this.client.keys(this.prefix + '*')
    if (!keys) return null

    keys.forEach(async(key) => {
      await this.client.del(key)
    })
  }

  _getTTL(sess) {
    let ttl
    if (sess && sess.cookie && sess.cookie.expires) {
      let ms = Number(new Date(sess.cookie.expires)) - Date.now()
      ttl = Math.ceil(ms / 1000)
    } else {
      ttl = this.ttl
    }
    return ttl
  }
}