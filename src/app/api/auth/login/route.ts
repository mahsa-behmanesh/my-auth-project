// Login API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { findUserByCredentials } from '@/lib/db';
import { generateToken, setTokenCookie } from '@/lib/auth';
import { LoginRequest, LoginResponse, ErrorResponse } from '@/types/types';

export async function POST(request: NextRequest): Promise<NextResponse<LoginResponse | ErrorResponse>> {
  try {
    const { username, password }: LoginRequest = await request.json();
    
    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Find user
    const user = findUserByCredentials(username, password);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    // Generate token
    const token = generateToken(user);
    
    // Set token in cookie
    await setTokenCookie(token);
    
    // Return success response
    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      },
      message: 'Login successful',
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}