import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import bcrypt from 'bcryptjs'


export async function POST(request: Request) {
    await dbConnect()
    try {
        const { firstName, lastName, password, number } = await request.json()

        const existingVerifiedUserByUsername = await userModel.findOne({
            number,
            isVerified: true
        })

        if (!existingVerifiedUserByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "User Already Exists"
                }, { status: 400 }
            )
        }

        const exitingUserByNumber = await userModel.findOne({ number })
        let OTP = Math.floor(Math.random() * 900000).toString();

        if (exitingUserByNumber) {
            return Response.json(
                {
                    success: false,
                    message: 'User already exists with this Number',
                },
                { status: 400 }
            );
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            exitingUserByNumber.password = hashedPassword
        }


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