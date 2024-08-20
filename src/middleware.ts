import { NextResponse, NextRequest } from 'next/server';
export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest) {
    try {
        const cookies = request.cookies;
        const token = cookies.get('next-auth.session-token')
        const url = request.nextUrl

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
        '/user/:path*',
        '/orders',
        '/login',
        '/sign-up',
        '/verify',
        '/',
    ],
};