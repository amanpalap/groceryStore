
import { getDecodedToken } from "@/helpers/getDecodedToken";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import { NextResponse, NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "No token found",
            }, { status: 401 });
        }

        const decodedData = getDecodedToken(token);

        if (!decodedData) {
            return NextResponse.json({
                success: false,
                message: "Invalid token",
            }, { status: 401 });
        }

        console.log("Decoded Data:", decodedData);

        const user = await userModel.findById(decodedData.id);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        // Return user data in the response
        return NextResponse.json({
            success: true,
            data: user,
        }, { status: 200 });

    } catch (error) {
        console.log("failed to get User Profile", error);
        return NextResponse.json(
            {
                success: false,
                message: "failed to get User Profile",
            },
            { status: 500 }
        );
    }
}
