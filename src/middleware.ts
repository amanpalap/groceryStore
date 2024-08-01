import { NextURL } from 'next/dist/server/web/next-url'
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')
    const url = request.nextUrl

    if (token &&
        (url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify') ||
            url.pathname === '/')
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }


}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/about/:path*', '/another-protected-route'],
}