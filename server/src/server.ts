import { Elysia } from 'elysia'
import cors from '@elysiajs/cors';
import Router from './router/router';
import { Logestic } from 'logestic';
import env from 'dotenv';
import jwt from '@elysiajs/jwt';
import bearer from '@elysiajs/bearer';
env.config();
const port = process.env.PORT as string;
new Elysia()
  .use(Logestic.preset('common'))
  .use(jwt({
    name: 'jwt',
    secret: process.env.SECRET_KEY as string,
    userId: '',
    role: '',
  }))
  .use(bearer())
  .use(cors())
  .use(Router)
  .listen(port, () => console.log(`app running on port: http://localhost:${port}`))