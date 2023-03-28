# Nuxt 3 Authentication Demo

Authentication demo web application with session based on Nuxt 3
　
## Environment

- Node v16.0 above
- Redis v7.0
- MongoDB v6.0

## Setup

Install data:

```
$ mongoimport --drop --db sampleDB --collection user --file user.json
```

Edit `.env` file:

```
SESSION_REDIS_URL=redis://localhost:6379/
MONGO_URL=mongodb://localhost:27017/sampleDB
```

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
# yarn
yarn dev

# npm
npm run dev
```

## Production

Build the application for production:

```bash
# yarn
yarn build

# npm
npm run build
```

Launch the application for production:

```bash
# yarn
yarn start

# npm
npm start
```

## License

[MIT](./LICENSE)
