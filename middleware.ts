import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken")?.value;
  const { pathname } = req.nextUrl;

  // If the user is logged in, redirect /connect/login and /connect/signup to /profile
  if (
    authToken === "authenticated" &&
    (pathname === "/connect/login" || pathname === "/connect/signup")
  ) {
    const profileUrl = new URL("/profile", req.url);
    return NextResponse.redirect(profileUrl);
  }

  // Allow requests to static files and Next.js API routes
  if (
    pathname.startsWith("/_next") || // Next.js static files (JS, CSS)
    pathname.startsWith("/app/data") || // API routes
    pathname.startsWith("/public") || // Favicon
    pathname.endsWith(".png") || // Allow /public/*.png
    pathname === "/connect/login" || // Allow login page
    pathname === "/connect/signup" || // Allow signup page
    pathname.startsWith("/send") || // Allow send pages
    pathname === "/" // Allow Homepage
  ) {
    return NextResponse.next();
  }

  // Redirect to /connect/login if not authenticated
  if (!authToken || authToken !== "authenticated") {
    const loginUrl = new URL("/connect/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
