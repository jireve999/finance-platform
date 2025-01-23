import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors';
// import { HTTPException } from 'hono/http-exception';
import accounts from "./accounts";
import categories from './categories';
import transactions from './transactions';
import summary from './summary';
import plaid from "./plaid";
import subscriptions from './subscriptions';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');
app.use('*', cors({
  origin: 'https://finance-platform-tau.vercel.app',
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

const routes = app
  .route('/accounts', accounts)
  .route('/categories', categories)
  .route('/transactions', transactions)
  .route('/summary', summary)
  .route('/plaid', plaid)
  .route('/subscriptions', subscriptions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;