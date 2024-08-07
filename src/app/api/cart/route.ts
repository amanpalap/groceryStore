import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import userModel from "@/models/user";

export async function POST(response: NextResponse) {
    await dbConnect()
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({
                success: false,
                message: "No session found",
            }, { status: 401 });
        }

        const user = await userModel.findById(session.user._id);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

    } catch (error) {

    }
}