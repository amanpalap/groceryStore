import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(response: Response) {
    await dbConnect()

    try {
        const response = NextResponse.json({
            message: "Logout Successfull",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response

    } catch (error) {
        console.log("Logout Failed", error)
        return Response.json(
            {
                success: true,
                message: "Logout Failed",
            },
            { status: 500 }
        )
    }
}