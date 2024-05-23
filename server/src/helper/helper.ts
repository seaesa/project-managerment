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
} 