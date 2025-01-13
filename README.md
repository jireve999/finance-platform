## Description

This is a Finance Saas Platform with ability to track your income and expenses, categorize transactions and assign them to specific accounts, as well as how to import transactions using a CSV file, connect to your bank account using Plaid, and monetize this product using Lemon Squeezy.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database

1.Generate type definitions and SQL migration files.
```bash
npm run db:generate
```

2.Applies all pending migrations to the database
```bash
npm run db:migrate
```

3.Launches Drizzle Studio, a tool for visualizing and interactively managing the database. (optional)
```bash
npm run db:studio
```

## Deploy on Vercel

!Confirm that you have subscribed to Clerk's Pro version and Make sure that your application is configured to use the live key rather than the test key.