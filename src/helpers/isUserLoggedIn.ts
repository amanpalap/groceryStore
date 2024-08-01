import { NextRequest } from "next/server";

export function isUserLoggedIn(request: NextRequest) {
    const token = request.cookies?.get('token')
    if (!token) return false
    return true
}
