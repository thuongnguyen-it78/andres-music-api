import nodemailer from 'nodemailer'
import { MAIL_USER, MAIL_PASS } from '../constants/env.constant'

export const sendMail = (receiver, content, subject) => {
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
    from: '"Andres Platform" <andresnguyen.it78@gmail.com>',
    to: `${receiver}`,
    subject: `[Andres Platform] ${subject ? subject : ''}`,
    html: content,
  })
}
