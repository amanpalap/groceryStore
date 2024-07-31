import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getDecodedToken } from "@/helpers/getDecodedToken";

export async function GET(response: NextResponse) {
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