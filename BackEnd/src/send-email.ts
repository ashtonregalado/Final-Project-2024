import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'

dotenv.config();

export default async function sendEmail(name: string, email: string, message: string) {

    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        })
        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: "Message from " + name,
            text: `Name: ${name}\n Email: ${email} \n Message: ${message}`
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error("Error sending email (sendEmail error): ", error)
    }
}
