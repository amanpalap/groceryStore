import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import bcrypt from 'bcryptjs'
import { sendEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {

    await dbConnect()
    try {
        const { firstName, lastName, email, password } = await request.json()

        const user = await userModel.findOne({ email })
        let newOTP = Math.floor(100000 + Math.random() * 900000).toString();

        if (user) {
            if (user.isVerified) {
                console.log('user already exists with this email')
                return Response.json(
                    {
                        success: false,
                        message: 'user already exists with this email',
                    },
                    { status: 400 }
                );
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                const newExpiry = new Date(Date.now() + 10 * 60 * 1000);
                user.password = hashedPassword
                user.otp = newOTP
                user.otpExpiry = newExpiry
                await user.save()
            }
        } else {
            console.log("new user")
            const hashedPassword = await bcrypt.hash(password, 10)
            const newExpiry = new Date(Date.now() + 10 * 60 * 1000);
            console.log("new user2")

            const updatedUser = new userModel({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                address: null,
                otp: newOTP,
                otpExpiry: newExpiry,
                number: `0000${newOTP}`,
                isVerified: false,
                buckets: [],
            })
            console.log("new user2")

            await updatedUser.save();
        }

        const mailResponse = await sendEmail(email, firstName, lastName, newOTP)
        console.log(mailResponse)

        if (!mailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: 'email not sent',
                },
                { status: 400 }
            );
        }

        return Response.json(
            {
                success: true,
                message: 'User registered successfully. Please verify your account.',
            },
            { status: 201 }
        );

    } catch (error) {
        console.log("Error registering user", error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            }, { status: 500 }
        )

    }
}