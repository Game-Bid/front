import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value;
  console.log('Token:', token);
  const { pathname } = req.nextUrl;

  const protectedPaths = ['/my-page', '/write'];
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const publicOnlyPaths = ['/login', '/signup', '/find'];
  const isPublicOnlyPath = publicOnlyPaths.some((path) => pathname.startsWith(path));
  if (isPublicOnlyPath && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-page/:path*', '/write/:path*', '/login', '/signup', '/find/:path*'],
};