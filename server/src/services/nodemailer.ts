import nodemailer from 'nodemailer'
export const mailer = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.PASS_MAILER
  },
})