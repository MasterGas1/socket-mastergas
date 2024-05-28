import {createTransport} from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import dotenv from 'dotenv'

dotenv.config()

const transport = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass:  process.env.MAIL_PASSWORD
    }
} as SMTPTransport.Options)

export const sendEmail = async({receipients, subject, message}: {receipients: string, subject: string, message: string}) => {
    return await transport.sendMail({
        from: '<no-reply@mastergas23.com>',
        to: receipients,
        subject,
        text: message,
        html: message
    })
}