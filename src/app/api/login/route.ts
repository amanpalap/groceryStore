import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect()
    try {
        const { email, password } = await request.json()

        const user = await userModel.findOne({ email })

        if (!user) {
            return Response.json(
                {
                    success: true,
                    message: "user does not exists"
                }, { status: 400 }
            )
        }

        if (user && !user.isVerified) {
            return Response.json(
                {
                    success: true,
                    message: "user is not verified Please sign-up again"
                }, { status: 400 }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return Response.json(
                {
                    success: true,
                    message: "incorrect Password"
                }, { status: 400 }
            )
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            isVerified: user.isVerified
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const reponse = NextResponse.json(
            {
                success: true,
                message: "Login successfull",
            }
        )
        reponse.cookies.set("token", token, {
            httpOnly: true
        })

        return reponse


    } catch (error) {
        console.log("Error in login")
        return Response.json(
            {
                success: false,
                message: 'Error login'
            },
            { status: 500 }
        )
    }
}