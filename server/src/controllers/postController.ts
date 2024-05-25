import Elysia from "elysia";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { PostTypes } from "../types/postTypes";
import helper from "../helper/helper";
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
    const user = await prisma.user.findFirst({
      where: { email }
    })
    if (user) {
      const verifyPassword = bcrypt.compareSync(password, user.password)
      if (!verifyPassword) return { error: true, message: 'password is incorrect' }
    } else {
      return { error: true, message: 'Email does not exist!' }
    }
    const data = {
      userId: user.id,
      role: user.role
    }
    const token = await jwt?.sign(data as object)
    return { error: false, token }
  }, {
    type: 'application/json',
    beforeHandle(context) {
      const { email, password } = context.body as any
      const isEmail = helper.veifyEmail(email)
      if (!email || !password) return { error: true, message: 'email or password not found!' }
      else if (!isEmail) return { error: true, message: 'email is not valid!' }
    },
  })
  .post('/api/auth/register', async ({ jwt, body }: PostTypes) => {
    console.log(`ok`)
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
        }
      })
      userId = newUser.id
    } else if (user?.isVerifyEmail) {
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

    return { error: false, userId }
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
    console.log(userOTP[0])
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
        isVerifyEmail: true
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
  .post('/api/auth/current-user', async ({ body, jwt }: PostTypes) => {
    const { token } = body as any
    const isUser = await jwt?.verify(token) as any
    if (!isUser) return { error: true, message: 'Token has Expried' }
    const user = await prisma.user.findFirst({
      where: { id: isUser.userId }
    })
    if (!user) return { error: true, message: 'User not found' }
    return {
      user: {
        id: user.id,
        username: user.username,
        phone: user.phone,
        email: user.email,
        address: user.address,
      },
      error: false
    }
  }, {
    type: "application/json",
    beforeHandle(context) {
      const { token } = context.body as any
      if (!token) return { error: true, message: 'Token not found!' }
    }
  })
export default postController