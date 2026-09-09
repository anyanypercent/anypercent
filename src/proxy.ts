import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_COOKIE = "anypercent_site_access";
const ACCESS_VALUE = "granted";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAccess = request.cookies.get(ACCESS_COOKIE)?.value === ACCESS_VALUE;

  if (hasAccess || pathname === "/password") {
    return NextResponse.next();
  }

  const passwordUrl = request.nextUrl.clone();
  passwordUrl.pathname = "/password";
  passwordUrl.searchParams.set("from", `${pathname}${request.nextUrl.search}`);

  return NextResponse.redirect(passwordUrl);
}

export const config = {
  matcher: [
    "/((?!api/site-password|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|mp3|wav|css|js|map|txt|xml|json)$).*)",
  ],
};
