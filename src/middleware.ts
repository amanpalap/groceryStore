import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest) {
    console.log("middleware running")
    try {
        const token = await getToken({ req: request })
        const url = request.nextUrl;

        console.log(token)

        // Redirect logged-in users trying to access login, sign-up, or verify pages to /home
        if (token && (url.pathname.startsWith('/login') || url.pathname.startsWith('/sign-up') || url.pathname.startsWith('/verify'))) {
            return NextResponse.redirect(new URL('/home', request.url));
        }

        // Redirect logged-out users trying to access user pages to /login
        if (!token && url.pathname.startsWith('/user')) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Redirect the root URL to /home for both logged-in and logged-out users
        if (url.pathname === '/') {
            return NextResponse.redirect(new URL('/home', request.url));
        }

        // Default behavior: allow the request to proceed
        console.log("midleware response sent")
        return NextResponse.next();
    } catch (error) {
        // Log the error and provide additional context
        console.error('Error in middleware:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred in the middleware.'
            }, { status: 500 }
        )
    }
}

export const config = {
    // Use a more specific matcher to avoid potential ReDoS vulnerabilities
    matcher: [
        '/user/profile',
        '/user/cart',
        '/login',
        '/sign-up',
        '/verify',
        '/',
    ],
};