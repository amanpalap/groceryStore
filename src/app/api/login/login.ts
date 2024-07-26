import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";


export async function POST(request: Request) {
    await dbConnect()
    try {
        const { email, password } = await request.json()

        const user = await userModel.findOne({ email })

        if (!user) {
            return Response.json(
                {
                    success: true,
                    message: "user does not exists"
                }, { status: 400 }
            )
        }



    } catch (error) {
        console.log("Error in login")
        return Response.json(
            {
                success: false,
                message: 'Error login'
            },
            { status: 500 }
        )
    }
}