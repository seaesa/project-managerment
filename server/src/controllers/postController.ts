import Elysia, { RouteSchema } from "elysia";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { PostTypes } from "../types/postTypes";
import helper from "../helper/helper";
import { MaybeArray, MergeSchema, OptionalHandler } from "elysia/dist/types";

// initial prisma client
const prisma = new PrismaClient()

// handle before match router
const beforeHandle = ({ body, set }: PostTypes) => {
  if (!body) {
    set.status = 400
    return { error: true, message: 'request with post method must be body' }
  }
}
const postController = new Elysia()
  .onBeforeHandle(beforeHandle as any)
  .post('/api/auth/login', async ({ body, jwt }: PostTypes) => {
    const { email, password } = body;

  }, {
    type: 'application/json'
  })
  .post('/api/auth/register', async ({ jwt, body }: PostTypes) => {
    const { email, password } = body;
    let userId;
    const user = await prisma.user.findFirst({
      where: { email }
    })
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          email: email,
          username: helper.transformEmailToUsername(email),
          password: bcrypt.hashSync(password, 10),
          isVerify: false
        }
      })
      userId = newUser.id
    } else if (user?.isVerify) {
      return { error: true, message: 'Email is Existed!' }
    } else {
      userId = user?.id
    }
    // genarate code
    const code = helper.genarateCode()
    const fifteenMinutes = 15 * 60 * 1000;
    await prisma.verifyOTP.createMany({
      data: {
        userId: userId as string,
        otp: bcrypt.hashSync(code, 10),
        expiresAt: Date.now() + fifteenMinutes
      }
    })
    // send code to verify email
    helper.sendMail(email, code)

    return { error: false, userId, date: Date.now(), code }
  }, {
    type: 'application/json',
    beforeHandle: (context) => {
      const { email, password, confirmPassword } = context.body as any
      const isEmail = helper.veifyEmail(email)
      if (!isEmail) return { error: true, message: 'Email is not valid!' }
      else if (password !== confirmPassword) return { error: true, message: 'Password and Confirm Password not matched!' }
    },
  })
  .post('/api/auth/verify-otp', async ({ body }: PostTypes) => {
    const { otp, userId } = body
    const userOTP = await prisma.verifyOTP.findMany({
      where: { userId },
      orderBy: { expiresAt: 'desc' }
    })
    const { expiresAt } = userOTP[0]
    const hashedOTP = userOTP[0].otp
    console.log(expiresAt)
    if (expiresAt < Date.now()) {
      await prisma.verifyOTP.deleteMany({
        where: { userId }
      })
      return { error: true, message: 'Code has expried. please resend code again!' }
    }
    const validOTP = bcrypt.compareSync(otp, hashedOTP)
    if (!validOTP) return { error: true, message: 'invalid code passed, please check your email!' }
    await prisma.user.update({
      where: { id: userId },
      data: {
        isVerify: true
      }
    })
    await prisma.verifyOTP.deleteMany({ where: { userId } })
    return { error: false }
  }, {
    type: 'application/json',
    beforeHandle(context) {
      const { otp, userId } = context.body as any
      if (!otp || !userId) return { error: true, message: 'can\'t find OTP or userId in request' }
    },
  })
export default postController