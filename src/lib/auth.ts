// Authentication utilities for JWT token management
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { User, SafeUser } from "@/types/types";

const JWT_SECRET = "your-secret-key";

/**
 * Generate a JWT token for the user
 * @param user User object
 * @returns JWT token
 */
export function generateToken(user: User): string {
  // Remove password from token payload
  const { password, ...userWithoutPassword } = user;

  const token = jwt.sign(userWithoutPassword as SafeUser, JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
}

/**
 * Verify the JWT token
 * @param token JWT token
 * @returns User data if token is valid, null otherwise
 */
export function verifyToken(token: string): SafeUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SafeUser;
  } catch (error) {
    return null;
  }
}

/**
 * Set JWT token in HTTP-only cookie
 * @param token JWT token
 */
export async function setTokenCookie(
  token: string,
  role: string
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  cookieStore.set("role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}

/**
 * Clear JWT token cookie
 */
export async function clearTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
  cookieStore.set("role", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

/**
 * Get JWT token from cookie
 * @returns Token string if exists, undefined otherwise
 */
export async function getTokenFromCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export async function getRoleFromCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("role")?.value;
}
