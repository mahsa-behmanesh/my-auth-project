// Get all users API endpoint (admin only)
import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/db';
import { SafeUser } from '@/types/types';

interface UsersResponse {
  users: SafeUser[];
}

interface UsersErrorResponse {
  error: string;
}

export async function GET(): Promise<NextResponse<UsersResponse | UsersErrorResponse>> {
  try {
    // Get all users (this endpoint is protected by middleware for admin only)
    const users = getAllUsers();
    
    return NextResponse.json({ users });
    
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}