// export { auth as middleware } from '../auth';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/signin' || path === '/signup';

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/signup', '/'],
};
