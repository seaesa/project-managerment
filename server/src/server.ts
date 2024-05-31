import { Elysia } from 'elysia'
import { Logestic } from 'logestic';
import cors from '@elysiajs/cors';
import env from 'dotenv';
import jwt from '@elysiajs/jwt';
import bearer from '@elysiajs/bearer';

import Router from './router/router';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const port = process.env.PORT as string;
env.config();

(async () => {
  try {
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
  } catch (error) {
    return { error: true, message: error }
  } finally {
    await prisma.$disconnect()
  }
})()