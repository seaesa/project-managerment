import { mailer } from "../services/nodemailer"

export default new class Helper {
  genarateCode() {
    return (Math.floor(1000 + Math.random() * 9000)).toString()
  }
  transformEmailToUsername(email: string) {
    return email.split('@')[0]
  }
  veifyEmail(email: string) {
    const regexValidateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regexValidateEmail.test(String(email).toLocaleLowerCase())
  }
  async sendMail(email: string, code: string | number) {
    const isEmail = this.veifyEmail(email)
    if (isEmail)
      return await mailer.sendMail({
        from: `"PM Service"<${process.env.USER_MAILER}>`,
        to: email,
        subject: 'Verify Your Account!',
        html: `<h3>${code}</h3>`,
      })
    else
      return new Error('Email is not valid!')
  }
} 