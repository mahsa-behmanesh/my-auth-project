// Mock database for users
import { User, SafeUser } from '@/types/types';

// Mock users data - in a real app, this would be in a database
const users: User[] = [
  { 
    id: 1, 
    username: 'admin', 
    password: 'admin123', 
    name: 'Admin User',
    role: 'admin'
  },
  { 
    id: 2, 
    username: 'user', 
    password: 'user123', 
    name: 'Regular User',
    role: 'user'
  }
];

/**
 * Find a user by username and password
 * @param username Username
 * @param password Password
 * @returns User object if found, undefined otherwise
 */
export function findUserByCredentials(username: string, password: string): User | undefined {
  return users.find(
    (user) => user.username === username && user.password === password
  );
}

/**
 * Get all users (without passwords)
 * @returns Array of users without passwords
 */
export function getAllUsers(): SafeUser[] {
  // Remove passwords for security
  return users.map(({ password, ...user }) => user);
}