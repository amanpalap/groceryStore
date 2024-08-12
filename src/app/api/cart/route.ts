import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import OrdersModel from "@/models/cart";

export async function POST(request: NextRequest, response: NextResponse) {
    await dbConnect()
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({
                success: false,
                message: "No session found",
            }, { status: 401 });
        }

        const { customer, address, phoneNumber, cartItems, total } = await request.json();

        const newOrder = new OrdersModel({
            customer,
            address,
            phoneNumber,
            cartItems,
            total,
            orderDate: new Date(),
        });

        await newOrder.save();

        return NextResponse.json({
            success: true,
            message: "Order placed successfully",
            order: newOrder,
        }, { status: 201 });

    } catch (error) {
        console.log("Failed to Place order", error)
        return NextResponse.json({
            success: false,
            message: "Failed to Place order",
        }, { status: 404 });
    }
}