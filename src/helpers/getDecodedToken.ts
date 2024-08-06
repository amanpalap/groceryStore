import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export default function getDecodedToken(req: NextRequest, res: NextResponse) {
    const token = req.cookies.get('next-auth.session-token')?.value.toString();
    console.log(token)

    if (!token) {
        return NextResponse.json({
            success: false,
            message: "No token",
        }, { status: 401 });
    }


    try {
        // Decode the token (without verification)
        const decodedToken = jwt.decode(token);



        // Respond with the decoded token
        return decodedToken
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error decoding token:", error);

        // Respond with an error message
        return NextResponse.json({
            success: false,
            message: "No token",
        }, { status: 401 });
    }

}