export default {
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  serverMiddleware: [
    { path: '/api', handler: '~/server-middleware/ac.ts' }  // APIにアクセス制限を掛ける
  ],
  meta: {
    title: 'Nuxt3 Auth Demo',
    link: [
      {
        href: 'https://fonts.googleapis.com/css2?family=Helvetica:wght@100',
        rel: 'stylesheet',
      },
    ],
  },
  runtimeConfig: {
    sessionCookieName: process.env.SESSION_COOKIE_NAME || '__session',   // クッキー作成用シークレットコード
    sessionCookieSecret: process.env.SESSION_COOKIE_SECRET || 'secret',
    sessionExpires: parseInt(process.env.SESSION_EXPIRES || '60 * 30', 10), // 30分
    sessionIdPrefix: process.env.SESSION_ID_PREFIX || 'sess:', // Redisセッション保存用セッションIDプレフィックス
    sessionRedisUrl: process.env.SESSION_REDIS_URL || 'redis://localhost:6379/',

    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
  },
  nitro: {
    plugins: [
      "~/server/index.ts"
    ]
  },

  // Tailwind configuration
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'system', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: '',
  },
}
