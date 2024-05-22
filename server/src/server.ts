import { Elysia } from 'elysia'
import cors from '@elysiajs/cors';

import Router from './router/router';

import env from 'dotenv';
import jwt from '@elysiajs/jwt';
env.config();

const port = process.env.PORT as string;
new Elysia()
  .use(cors())
  .use(jwt({ name: 'jwt', secret: process.env.SECRET_KEY as string }))
  .use(Router)
  .listen(port, () => console.log(`app running on port: http://localhost:${port}`))
