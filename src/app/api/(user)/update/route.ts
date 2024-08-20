import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function PUT(request: NextRequest) {
    await dbConnect();

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({
                success: false,
                message: "No token found",
            }, { status: 401 });
        }

        const { address, number } = await request.json()

        const user = await userModel.findOne({ number })

        if (user && user._id?.toString() !== session.user._id) {
            return NextResponse.json({
                success: false,
                message: "This number is already used by another account",
            }, { status: 400 })
        }

        const existingUser = await userModel.findOne({ _id: session.user._id })

        if (!existingUser) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        } else {
            existingUser.address = address
            existingUser.number = number
            await existingUser.save()
            session.user.address = address
            session.user.number = number

            return NextResponse.json({
                success: true,
                message: "User updated successfully",
            }, { status: 200 });
        }

    } catch (error) {
        console.log("failed to update User Profile", error);
        return NextResponse.json(
            {
                success: false,
                message: "failed to update User Profile",
            },
            { status: 500 }
        );
    }
}
