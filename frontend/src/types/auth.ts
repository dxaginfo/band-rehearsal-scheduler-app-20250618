/**
 * Authentication types for the application
 */

/**
 * User profile information
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  instrument?: string;
  profileImageUrl?: string;
  createdAt?: string;
}

/**
 * Authentication token response from login/register
 */
export interface AuthTokens {
  token: string;
  refreshToken: string;
  expiresIn: number; // seconds until token expiration
}

/**
 * Complete auth response combining user and tokens
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Register request payload
 */
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  instrument?: string;
}

/**
 * Refresh token request payload
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Forgot password request payload
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Reset password request payload
 */
export interface ResetPasswordRequest {
  token: string;
  password: string;
}

/**
 * Update profile request payload
 */
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  instrument?: string;
  profileImageUrl?: string;
}

/**
 * Change password request payload
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}