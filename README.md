# Instaclone

Full-stack clone of Instagram website, with a personal touch on UI.


## Get the project running

- install packages (delete pnpm-lock.yaml to use npm)

```bash
pnpm install
```

- replace env variables

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
EMAIL="john.doe@gmail.com"
PASSWORD="apppassword"
JWT_SECRET="token_secret"
NODE_ENV="development" #production | development
NEXT_PUBLIC_UPLOADCARE_PUB_KEY="api_key"
NEXT_PUBLIC_DEPLOY_URL="https://instagram-clone.vercel.app"
```

- run prisma migrate on dev mode

```bash
npx prisma migrate dev --name init
```

- start project

```bash
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
