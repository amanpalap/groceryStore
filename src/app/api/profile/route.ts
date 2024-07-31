import { getDecodedToken } from "@/helpers/getDecodedToken";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request: NextRequest) {
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

        const { address, number } = await request.json()

        const user = await userModel.findOne({ number })

        if (user) {
            return NextResponse.json({
                success: true,
                message: "This number is already used by another account",
            }, { status: 400 })
        }

        const existingUser = await userModel.findOne({ _id: decodedData.id })

        if (!existingUser) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        } else {
            existingUser.address = address
            existingUser.number = number
            await existingUser.save()
        }

        return NextResponse.json(
            {
                success: true,
                message: "User Updated successfully",
            }, { status: 200 }
        )

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
