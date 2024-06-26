import Elysia from "elysia";
import helper from "../helper/helper";
import bcrypt from 'bcrypt'
import { PostTypes } from "../types/postTypes";
import { PrismaClient } from "@prisma/client";
import unidecode from 'unidecode'
// initial prisma client query to database
const prisma = new PrismaClient()
// a instance elysia
export const auth = new Elysia()
  // [POST]: api/auth/login 
  .post('/api/auth/login', async ({ body, jwt }: PostTypes) => {
    try {
      const { email, password } = body;
      // query to db get first user
      const user = await prisma.user.findUnique({
        where: { email },
        select: { email: true, password: true, id: true, role: true }
      })
      // if have user to pass else return error
      if (user) {
        /**
         * @compareSync : compare password asynchronus with fisrt parameter is current password
         * and two parameter is password has hash in db and return boolean
         * @verifyPassword : boolean
         */
        const verifyPassword = bcrypt.compareSync(password, user.password as any)
        if (!verifyPassword) throw new Error('password is incorrect')
      } else
        throw new Error('Email does not exist!')
      // define data asign to json web token
      const data = {
        userId: user.id,
        role: user.role
      }
      // method sign encode data to token
      const token = await jwt?.sign(data as object)
      return { error: false, token }
    } catch (error: any) {
      return { error: true, message: error.message }
    }
  }, {
    // specify data from body
    type: 'application/json',
    /**
     * @beforeHandle : method excute before above route be match
     * with @context is request from client
     */
    beforeHandle(context) {
      const { email, password } = context.body as any
      /**
       * @verifyEmail : method check is email or not
       */
      const isEmail = helper.veifyEmail(email)
      if (!email || !password) return { error: true, message: 'email or password not found!' }
      else if (!isEmail) return { error: true, message: 'email is not valid!' }
    },
  })
  // [POST]: api/auth/register
  // sign up user
  .post('/api/auth/register', async ({ body }: PostTypes) => {
    try {
      const { email, password } = body;
      let userId;
      // find user unique
      const user = await prisma.user.findFirst({
        where: { email }
      })
      if (!user) {
        // create user
        const newUser = await prisma.user.create({
          data: {
            email,
            username: helper.transformEmailToUsername(email),
            password: bcrypt.hashSync(password, 10),
          }
        })
        userId = newUser.id
      } else if (user?.isVerifyEmail) {
        throw new Error('Email is Existed!')
      } else {
        userId = user?.id
      }
      // random genarate code with four number
      const code = helper.genarateCode()
      // init 15 minutes to expries otp be verify email
      const fifteenMinutes = 15 * 60 * 1000;
      // create multiple otp
      await prisma.verifyOTP.createMany({
        data: {
          userId: userId as string,
          otp: bcrypt.hashSync(code, 10),
          expiresAt: Date.now() + fifteenMinutes
        }
      })
      // send code to gmail be verify email
      helper.sendMail(email, code)

      return { error: false, userId }
    } catch (error: any) {
      return { error: true, message: error.message }
    }
  }, {
    // specify data from body
    type: 'application/json',
    /**
     * @beforeHandle : method excute before above route be match
     * with @context is request from client
     */
    beforeHandle: (context) => {
      const { email, password, confirmPassword } = context.body as any
      const isEmail = helper.veifyEmail(email)
      if (!isEmail) return { error: true, message: 'Email is not valid!' }
      else if (password !== confirmPassword) return { error: true, message: 'Password and Confirm Password not matched!' }
    },
  })
  // [POST]: /api/auth/verify-otp 
  .post('/api/auth/verify-otp', async ({ body }: PostTypes) => {
    try {

      const { otp, userId } = body
      // find multiple otp. return a array
      const userOTP = await prisma.verifyOTP.findMany({
        where: { userId },
        orderBy: { expiresAt: 'desc' }
      })
      // get expriesAt from fisrt userOtp
      const { expiresAt } = userOTP[0]
      // top has hash
      const hashedOTP = userOTP[0].otp
      // check expried or not
      if (expiresAt < Date.now()) {
        await prisma.verifyOTP.deleteMany({
          where: { userId }
        })
        return { error: true, message: 'Code has expried. please resend code again!' }
      }
      const validOTP = bcrypt.compareSync(otp, hashedOTP)
      if (!validOTP) throw new Error('invalid code passed, please check your email!')
      await prisma.user.update({
        where: { id: userId },
        data: {
          isVerifyEmail: true
        }
      })
      await prisma.verifyOTP.deleteMany({ where: { userId } })
      return { error: false }
    } catch (error: any) {
      return { error: true, message: error.message }
    }
  }, {
    // specify data from body
    type: 'application/json',
    /**
     * @beforeHandle : method excute before above route be match
     * with @context is request from client
     */
    beforeHandle(context) {
      const { otp, userId } = context.body as any
      if (!otp || !userId) return { error: true, message: 'can\'t find OTP or userId in request' }
    },
  })
  // [POST: /ap/auth/current-user
  .post('/api/auth/current-user', async ({ body, jwt }: PostTypes) => {
    try {
      const { token } = body as any
      const isUser = await jwt?.verify(token) as any
      if (!isUser) throw new Error('Token has Expried')
      const user = await prisma.user.findFirst({
        where: { id: isUser.userId }
      })
      if (!user) throw new Error('User not found')
      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          address: user.address,
          role: user.role
        },
        error: false
      }
    } catch (error: any) {
      return { error: true, message: error.message }
    }
  }, {
    // specify data from body
    type: "application/json",
    /**
    * @beforeHandle : method excute before above route be match
    * with @context is request from client
    */
    beforeHandle(context) {
      const { token } = context.body as any
      if (!token) return { error: true, message: 'Token not found!' }
    }
  })
  .post('/api/auth/google', async ({ body, jwt }: PostTypes) => {
    try {
      const { email, displayName, image } = body
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })
      if (user) {
        const data = {
          userId: user.id,
          role: user.role
        }
        const token = await jwt?.sign(data as object)
        return { error: false, user, token }
      } else {
        const user = await prisma.user.create({
          data: {
            email,
            displayName: unidecode(displayName),
            username: helper.transformEmailToUsername(email),
            image
          }
        })
        const data = {
          userId: user.id,
          role: user.role
        }
        const token = await jwt?.sign(data as object)
        return { error: false, user, token }
      }
    } catch (error: any) {
      return { error: true, message: error.message }
    }
  })