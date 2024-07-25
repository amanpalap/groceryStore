import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    console.log("Sign-up is runnig")

    await dbConnect()
    try {
        const { firstName, lastName, password, number } = await request.json()

        const user = await userModel.findOne({ number, })
        let newOTP = Math.floor(100000 + Math.random() * 900000).toString();

        if (user) {
            return Response.json(
                {
                    success: false,
                    message: 'user exists with this number',
                },
                { status: 400 }
            );
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newExpiry = new Date(Date.now() + 10 * 60 * 1000);



            const updatedUser = new userModel({
                firstName,
                lastName,
                password: hashedPassword,
                address: '',
                otp: newOTP,
                otpExpiry: newExpiry,
                number,
                isVerified: false,
                buckets: [],
            })

            await updatedUser.save();
        }

        return Response.json(
            {
                success: true,
                message: 'User registered successfully. Please verify your account.',
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.log("Error registering user")
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            }, { status: 500 }
        )

    }
}