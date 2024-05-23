import { mailer } from "../services/nodemailer"

export default new class Helper {
  genarateCode() {
    return Math.floor(Math.random() * 100000)
  }
  transformEmailToUsername(email: string) {
    const newEmail = this.veifyEmail(email)
    if (newEmail) {
      return email.split('@')[0]
    } else {
      return null
    }
  }
  veifyEmail(email: string) {
    const regexValidateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regexValidateEmail.test(String(email).toLocaleLowerCase())
  }
  async sendMail(email: string, token: string | number) {
    const isEmail = this.veifyEmail(email)
    if (isEmail)
      return await mailer.sendMail({
        from: `"PM Service"<${process.env.USER_MAILER}>`,
        to: email,
        subject: 'Verify Your Account!',
        html: `<h3>${token}</h3>`
      })
    else
      return new Error('Email is not valid!')
  }
} 