
// User roles
export type Role = 'admin' | 'user';

// User with password (for database)
export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  role: Role;
}

// User without password (for client-side and JWT payload)
export type SafeUser = Omit<User, 'password'>;

// Login request payload
export interface LoginRequest {
  username: string;
  password: string;
}

// Login response
export interface LoginResponse {
  user: SafeUser;
  message: string;
}

// Error response
export interface ErrorResponse {
  error: string;
}