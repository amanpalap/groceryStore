import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";

export async function POST(request: Request, email: string) {
    await dbConnect()
    try {
        await request.json()

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