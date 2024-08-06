import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import userModel from '@/models/user';

export async function GET(request: NextRequest, response: NextResponse) {
    await dbConnect();

    try {
        const session = await getServerSession(authOptions);

        if (session) { console.log(session?.user) }

        if (!session) {
            return NextResponse.json({
                success: false,
                message: "No token found",
            }, { status: 401 });
        }

        const user = await userModel.findById(session.user._id);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: user,
        }, { status: 200 });

    } catch (error) {
        console.error("Failed to get User Profile:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to get User Profile",
            },
            { status: 500 }
        );
    }
}
