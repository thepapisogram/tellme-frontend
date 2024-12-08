import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken")?.value; // Retrieve the authToken from cookies
  const { pathname } = req.nextUrl;

  console.log("authToken:", authToken); // Log the token for debugging purposes
  console.log("pathname:", pathname); // Log the current pathname for debugging

  // Redirect logged-in users away from login and signup pages to /profile
  if (
    authToken === "authenticated" &&
    (pathname === "/connect/login" || pathname === "/connect/signup")
  ) {
    const profileUrl = new URL("/profile", req.url);
    return NextResponse.redirect(profileUrl);
  }

  // Allow requests to static files, Next.js assets, API routes, public files, or specific routes
  if (
    pathname.startsWith("/_next") || // Allow Next.js static files (JS, CSS)
    pathname.startsWith("/api") || // Allow API routes
    pathname.startsWith("/public") || // Allow public files
    pathname.endsWith(".png") || // Allow PNG files
    pathname === "/connect/login" || // Allow login page
    pathname === "/connect/signup" || // Allow signup page
    pathname.startsWith("/send") || // Allow "send" pages
    pathname === "/" // Allow homepage
  ) {
    return NextResponse.next(); // Allow the request to proceed
  }

  // Redirect unauthenticated users to /connect/login
  if (!authToken || authToken !== "authenticated") {
    const loginUrl = new URL("/connect/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Default behavior for other authenticated routes
  return NextResponse.next();
}
