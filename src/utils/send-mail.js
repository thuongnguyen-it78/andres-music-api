import nodemailer from 'nodemailer'
import { mailTemplate } from './mailTemplate.js'
import { USER_MAIL, PASS_MAIL } from '@/constants/env.constant'

export const sendMail = (mail, username, code) => {
  //configure mail sending protocol
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PASS_MAIL,
    },
  })
  //return promise
  return transporter.sendMail({
    from: '"ANDRES-MUSIC" <daylataikhoantest.dev@gmail.com>',
    to: `${mail}`,
    subject: '[ANDRES-MUSIC] Quên mật khẩu',
    html: mailTemplate(code, username),
  })
}
