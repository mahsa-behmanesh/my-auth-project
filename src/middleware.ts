import { NextResponse, type NextRequest } from "next/server";
import { Role } from "./types/types";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value as Role;

  // If logged in but trying to access login page
  if (token && pathname.startsWith("/auth/log-in")) {
    return NextResponse.redirect(
      new URL(
        role === "admin" ? "/admin-dashboard" : "/user-dashboard",
        request.url
      )
    );
  }

  // The User is not logged in
  if (
    !token &&
    (pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/user-dashboard"))
  ) {
    return NextResponse.redirect(new URL("/auth/log-in", request.url));
  }

  // checking athurization
  if (token && role !== "admin" && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/auth/log-in", request.url));
  }
  if (token && role !== "user" && pathname.startsWith("/user-dashboard")) {
    return NextResponse.redirect(new URL("/auth/log-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
