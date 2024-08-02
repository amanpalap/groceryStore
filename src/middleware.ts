import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')
    const url = request.nextUrl

    if (token &&
        (url.pathname.startsWith('/login') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify') ||
            url.pathname === '/')
    ) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    if (!token && url.pathname.startsWith('/user')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }


}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/user/:path*', '/login', '/sign-up', '/verify', '/'],
}