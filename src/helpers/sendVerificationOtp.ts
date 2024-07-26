import VerificationEmail from "../../emails/verificationEmails";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ApiResponse {
    success: boolean
    message: string
}

export async function sendVerificationEmail(
    email: string,
    firstName: string,
    lastName: string,
    newOTP: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            //TODO: change name
            subject: 'Grocers | verification code',
            react: VerificationEmail({ firstName, lastName, otp: newOTP }),
        });
        return {
            success: true,
            message: "verification email send successfully"
        }
    } catch (emailError) {
        console.log("Error sending verification Email", emailError);
        return {
            success: false,
            message: "failed to send verification email"
        }
    }
}