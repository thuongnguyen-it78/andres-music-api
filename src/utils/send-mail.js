import nodemailer from 'nodemailer'
import { mailTemplate } from './mailTemplate.js'
import { MAIL_USER, MAIL_PASS } from '@/constants/env.constant'

export const sendMail = (mail, username, code) => {
  //configure mail sending protocol
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
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
