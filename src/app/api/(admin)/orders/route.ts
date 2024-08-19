import dbConnect from "@/lib/dbConnect";
import OrdersModel from "@/models/cart";
import { NextResponse } from "next/server";

export async function POST(response: NextResponse) {
    await dbConnect()
    try {
        const data = await OrdersModel.find()

        if (!data) {
            return NextResponse.json(
                {
                    success: false,
                    message: "data not found"
                },
                { status: 400 }
            )
        }
        console.log(data)
        return NextResponse.json(
            {
                success: true,
                message: "data retrieved successfully",
                data: data
            },
            { status: 200 }
        )

    } catch (error) {
        console.log("Error while getting order", error)
        return NextResponse.json(
            {
                success: false,
                message: "Error while listing Orders",
            },
            { status: 500 }
        )
    }
}