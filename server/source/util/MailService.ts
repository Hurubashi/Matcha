import * as nodemailer from 'nodemailer'

export default class MailService {

	static async sendMail(email : string, subject: string, letter: string){

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD
			}
		})

		let message = {
			from: process.env.FROM_EMAIL,
			to: email,
			subject: subject,
			html: letter
		}

		await transporter.sendMail(message)

	}

}
