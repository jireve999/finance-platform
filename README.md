# Finance SaaS Platform  
## ps: please select data from=2024-12-08&to=2025-01-31, almost time has no data

## Tech Stack
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React.js](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Lemon Squeezy](https://img.shields.io/badge/lemonSqueezy.js-FFC233?style=for-the-badge&logo=lemonsqueezy&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-white?style=for-the-badge&logo=next.js&logoColor=000000)
![Hono](https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Plaid](https://img.shields.io/badge/Plaid-green?style=for-the-badge&logo=plaid&logoColor=white)

<!-- ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI/CD-007BFF?style=for-the-badge&logo=githubactions&logoColor=white) -->

## Description
This is a Finance SaaS Platform with ability to track your income and expenses, categorize transactions and assign them to specific accounts, as well as how to import transactions using a CSV file, connect to your bank account using Plaid, and monetize this product using Lemon Squeezy.

<img src="public/finance1.png" width="400" alt="finance1"><img src="public/finance2.jpg" width="400" alt="finance2">

<img src="public/finance3.jpg" width="400" alt="finance3"><img src="public/finance4.jpg" width="400" alt="finance4">

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
3.Create a bunch of data
```bash
npm run db:seed
```

4.Launches Drizzle Studio, a tool for visualizing and interactively managing the database. (optional)
```bash
npm run db:studio
```

## Deploy on Vercel
please visit: [https://finance-platform-tau.vercel.app]
