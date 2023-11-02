import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // if the incoming request had a URL of /original, this line would create a new URL of /original/home.
  // return NextResponse.redirect(new URL("/home", request.url));

  // get current path
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    // redirect to '/' if the user has token and trying to access login or signup
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// There are two ways to define which paths Middleware will run on:

// ? Custom matcher config:

// matcher allows you to filter Middleware to run on specific paths.
// ! must have '/'
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};

// ? Conditional Statements:

// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith("/about")) {
//     return NextResponse.rewrite(new URL("/about-2", request.url));
//   }

//   if (request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.rewrite(new URL("/dashboard/user", request.url));
//   }
// }
