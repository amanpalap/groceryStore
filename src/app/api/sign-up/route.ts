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

        const existingUserByNumber = await userModel.findOne({ number })
        let newOTP = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByNumber) {
            if (existingUserByNumber.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: 'User already exists with this Number',
                    },
                    { status: 400 }
                );
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByNumber.password = hashedPassword;
                existingUserByNumber.otp = newOTP
                existingUserByNumber.otpExpiry = new Date(Date.now() + 3600000)
                await existingUserByNumber.save()
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newExpiry = new Date();
            newExpiry.setHours(newExpiry.getHours() + 1)

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