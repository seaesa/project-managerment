import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";
import helper from "../helper/helper";
import { PostTypes } from "../types/postTypes";
const prisma = new PrismaClient()


const postController = new Elysia()
  .onBeforeHandle(({ body, set }) => {
    if (!body) {
      set.status = 400
      return { error: true, message: 'request with post method must be body' }
    }
  })
  .post('/api/auth/login', async ({ body, jwt }: PostTypes) => {

  }, {
    type: 'application/json'
  })
  .post('/api/auth/register', async ({ jwt, body }: PostTypes) => {
    const user = prisma.user.findFirst({
      where: { email: body.email }
    })
    if (!user) {
      return { error: true, message: 'Email is Existed!' }
    }
    const code = helper.genarateCode()
    return { code, ok: helper.transformEmailToUsername(body.email as string) }
  }, {
    type: 'application/json',
    beforeHandle: (context) => {
      const { email, password, confirmPassword } = context.body as any
      const isEmail = helper.veifyEmail(email)
      if (!isEmail) return { error: true, message: 'Email is not valid!' }
      else if (password !== confirmPassword) return { error: true, message: 'Password and Confirm Password not matched!' }
    },
  })
  .post('/api/auth/code', ({ body }) => {

  }, {
    type: 'application/json',
  })
export default postController