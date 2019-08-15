const nodemailer    = require("nodemailer")

/**
 * @description Mail service
 */
class MailService {

	static async sendMail(email, subject, text){
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		let testAccount = await nodemailer.createTestAccount();

		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: 'brycen.bailey40@ethereal.email',
				pass: 'HshV9FM19QPgkuX3kJ'
			}
		});
		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: 'account@matcha.email', // sender address
			to: email,
			subject: subject, // Subject line
			text: text, // plain text body
		});

		// Preview only available when sending through an Ethereal account
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	}

}

module.exports = MailService


