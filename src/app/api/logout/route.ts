import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect()

    try {
        const response = NextResponse.json({
            message: "Logout Successfull",
            success: true
        }, { status: 200 }
        )

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response

    } catch (error) {
        console.log("Logout Failed", error)
        return NextResponse.json(
            {
                success: false,
                message: "Logout Failed",
            },
            { status: 500 }
        )
    }
}