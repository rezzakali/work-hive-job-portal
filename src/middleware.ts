import {
  PROTECTED_SUB_ROUTES,
  PUBLIC_ROUTES,
  ROOT,
  SIGNIN,
  SIGNUP, // Assuming you have a SIGNUP route
} from '@/src/lib/routes';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // Get cookies from the request
  const cookieStore = await cookies();
  const hasCookie = cookieStore.get('client.sid')?.value;

  // Check if the user is authenticated
  const isAuthenticated = !!hasCookie;

  // Determine if the current route is public
  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => nextUrl.pathname.startsWith(route)) &&
    !PROTECTED_SUB_ROUTES.some((route) => nextUrl.pathname.includes(route));

  // If the user is not authenticated and the route is not public, redirect to the SIGNIN page
  if (!isAuthenticated && (!isPublicRoute || nextUrl.pathname === ROOT)) {
    return Response.redirect(new URL(SIGNIN, nextUrl));
  }

  // If the user is authenticated and trying to access SIGNIN or SIGNUP, redirect to the ROOT page
  if (
    isAuthenticated &&
    (nextUrl.pathname === SIGNIN || nextUrl.pathname === SIGNUP)
  ) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
