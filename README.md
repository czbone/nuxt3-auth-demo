# 現在の状況

ユーザ認証機能はうまく動作している。

## 主な仕様

- Nuxt3(Expressなし)
- CSSフレームワーク「tailwind」
- 認証部分は「nuxt3-auth-example-main」を参考にしている
- Redisでの独自セッション管理(WSL2でRedisを起動する必要あり)
- MongoDBでユーザ情報管理(WSL2でMongoDBを起動する必要あり)

# 準備

MongoDBにデータベース(sampleDB)を作成し、ユーザデータ(data/user.json)を以下のコマンドでインポートします。

```
$ mongoimport --drop --db sampleDB --collection user --file user.json
```

# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.
