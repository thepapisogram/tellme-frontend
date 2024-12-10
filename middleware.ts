import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const verifyToken = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  console.log(jwtSecret);

  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined in the environment variables.");
    return null; // Indicate invalid token due to missing secret
  }

  try {
    return jwt.verify(token, jwtSecret); // Now jwtSecret is guaranteed to be a valid value
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null; // Indicate invalid token
  }
};

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("token")?.value as string ; // Retrieve the authToken from cookies
  const { pathname } = req.nextUrl;

  // Redirect logged-in users away from login and signup pages to /profile
  if (
    authToken &&
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
    pathname.endsWith(".webp") || // Allow WEBP files
    pathname === "/connect/login" || // Allow login page
    pathname === "/connect/signup" || // Allow signup page
    pathname.startsWith("/send") || // Allow "send" pages
    pathname === "/" // Allow homepage
  ) {
    return NextResponse.next(); // Allow the request to proceed
  }

  // Redirect unauthenticated users to /connect/login
  if (!authToken) {
    const loginUrl = new URL("/connect/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Default behavior for other authenticated routes
  return NextResponse.next();
}
