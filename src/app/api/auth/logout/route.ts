// Logout API endpoint
import { NextResponse } from 'next/server';
import { clearTokenCookie } from '@/lib/auth';

interface LogoutResponse {
  message: string;
}

interface LogoutErrorResponse {
  error: string;
}

export async function POST(): Promise<NextResponse<LogoutResponse | LogoutErrorResponse>> {
  try {
    // Clear token cookie
    await clearTokenCookie();
    
    // Return success response
    return NextResponse.json({
      message: 'Logout successful',
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}