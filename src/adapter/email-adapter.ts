import nodemailer from 'nodemailer'

export const emailAdapter = {
	async sendEmail(email: string, subject: string, message: string) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: 'mpara7274@gmail.com',
			  pass: 'ldhkcdcybmrbxaew'
			}
		  });
		  
		  async function main() {
			const info = await transporter.sendMail({
			  from: 'Mihail <mpara7274@gmail.com>', // sender address
			  to: email, // list of receivers
			  subject: subject, // Subject line
			  html: message, // html body
			});
		  
			console.log("Message sent: %s", info);
		  }
		  main().catch(console.error);
	}
}