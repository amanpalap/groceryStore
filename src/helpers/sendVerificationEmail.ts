import nodemailer from 'nodemailer'

export async function sendEmail(
    email: string,
    firstName: string,
    lastName: string,
    newOTP: string
) {
    try {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ae58ec35aed09f",
                pass: "c126762750eaee"
            }
        });

        const mailOptions = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: "Grocers || Verification Code", // Subject line
            html: "<b>Hello world?</b>", // html body
        }

        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse

    } catch (emailError) {
        console.log("Error sending verification Email", emailError);
        return Response.json(
            {
                success: false,
                message: "failed to send verification email"
            }, { status: 500 }
        )
    }
}