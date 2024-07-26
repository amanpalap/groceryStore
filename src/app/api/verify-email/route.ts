import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { email, otp } = await request.json()

        const user = await userModel.findOne({ email })

        if (!user) {
            return Response.json(
                {
                    status: false,
                    message: "User not found"
                },
                { status: 400 }
            )
        }

        const validOtp = user.otp === otp
        const isOtpNotExpired = new Date(user.otpExpiry) > new Date()

        if (validOtp && isOtpNotExpired) {
            console.log("c-1")
            user.isVerified = true
            await user.save()
            return Response.json(
                {
                    status: true,
                    message: "User Verified successfully"
                },
                { status: 200 }
            )
        } else if (validOtp && !isOtpNotExpired) {
            console.log("c-2")

            return Response.json(
                {
                    status: false,
                    message: "OTP expired, Please signup again"
                },
                { status: 400 }
            )
        } else {
            console.log("c-2")

            return Response.json(
                {
                    status: false,
                    message: "incorrect OTP"
                },
                { status: 400 }
            )
        }

    } catch (error: any) {
        console.log("Error verifying user", error)
        return Response.json(
            {
                success: false,
                message: "Error verifying user"
            },
            { status: 500 }
        )

    }
}