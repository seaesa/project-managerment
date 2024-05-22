import { JWTPayloadSpec } from "@elysiajs/jwt";
import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

type Props = {
  body: {
    username?: string,
    email?: string,
    password?: string
  },
  jwt?: {
    sign(payload: JWTPayloadSpec): Promise<string>,
    verify(payload: string): Promise<JWTPayloadSpec | false>
  }
}
const postController = new Elysia()
  .post('/api/auth/login', async ({ body, jwt }: Props) => {

  }, {
    type: 'application/json'
  })
  .post('api/auth/register', async ({ jwt, body }: Props) => {
    const user = prisma.user.findFirst({
      where: {
        email: body.email,
        username: body.username
      }
    })
    if (!user) {

    }
  }, {
    type: 'application/json'
  })
export default postController