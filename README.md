# Nuxt - project setup

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

# styling - tailwind

https://tailwindcss.com/

project styles:
http://localhost:3000/\_tailwind

## prime vue

https://primevue.org/

# Prisma - orm database

all files are stored in the src/prisma - schema.prisma is database structure

Online tool for checking database:

```bash
npx prisma studio
```

## making changes

`https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/overview`

develpoment mode -

```bash
npx prisma db push
```

production mode - (generate migration so you can look what changed)

```bash
npx prisma migrate dev --name [name]
```
