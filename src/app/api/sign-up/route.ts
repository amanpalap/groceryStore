import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationOtp";

export async function POST(request: Request) {

    await dbConnect()
    try {
        const { firstName, lastName, email, password } = await request.json()

        const existingUserVerified = await userModel.findOne({
            email,
            isVerified: true
        })

        if (existingUserVerified) {
            console.log('user already exists with this email')
            return Response.json(
                {
                    success: false,
                    message: 'user already exists with this email',
                },
                { status: 400 }
            );
        }

        const user = await userModel.findOne({ email })

        let newOTP = Math.floor(100000 + Math.random() * 900000).toString();

        if (user) {
            if (!user.isVerified) {

                const hashedPassword = await bcrypt.hash(password, 10)
                const newExpiry = new Date(Date.now() + 10 * 60 * 1000);
                user.password = hashedPassword
                user.otp = newOTP
                user.otpExpiry = newExpiry
                await user.save()
                console.log('user already exists not verified')

            }
        } else {
            console.log('new user')

            const hashedPassword = await bcrypt.hash(password, 10)
            const newExpiry = new Date(Date.now() + 10 * 60 * 1000);

            const updatedUser = new userModel({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                address: '',
                otp: newOTP,
                otpExpiry: newExpiry,
                number: '',
                isVerified: false,
                buckets: [],
            })

            await updatedUser.save();

        }

        const emailResponse = await sendVerificationEmail(email, firstName, lastName, newOTP)

        if (!emailResponse.success) {
            console.log('user already exists not verified')

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



    } catch (error: any) {
        console.log("Error registering user", error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            }, { status: 500 }
        )

    }
}