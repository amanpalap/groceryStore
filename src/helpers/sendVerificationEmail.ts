import { ApiResponse } from '@/types/ApiResponse';
import nodemailer from 'nodemailer'

export async function sendEmail(
    email: string,
    firstName: string,
    lastName: string,
    newOTP: string
): Promise<ApiResponse> {
    try {
        var transport = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USERNAME,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: 'greengrocersofficial@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Green Grocers || Verification Code", // Subject line
            html: `<b>Hello ${firstName + ' ' + lastName}</b>
                    <br><br>
                    your OTP: <b>${newOTP}</b>`, // html body
        }

        await transport.sendMail(mailOptions);

        return {
            success: true,
            message: 'mail sent successfully'
        }

    } catch (emailError) {
        console.log("Error sending verification Email", emailError);
        return {
            success: false,
            message: 'Error sending mail'
        }
    }
}