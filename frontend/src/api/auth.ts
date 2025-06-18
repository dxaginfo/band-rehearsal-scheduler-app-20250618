/**
 * Authentication API service
 */

import axios from 'axios';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateProfileRequest
} from '@/types/auth';

// Create base API instance
const authApi = axios.create({
  baseURL: `${process.env.API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Register a new user
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await authApi.post('/register', data);
  return response.data;
};

/**
 * Login a user
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await authApi.post('/login', data);
  return response.data;
};

/**
 * Refresh the access token using a refresh token
 */
export const refreshToken = async (data: RefreshTokenRequest): Promise<AuthResponse> => {
  const response = await authApi.post('/refresh', data);
  return response.data;
};

/**
 * Get the current user's profile
 */
export const getProfile = async (token: string): Promise<AuthResponse['user']> => {
  const response = await authApi.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Update the current user's profile
 */
export const updateProfile = async (data: UpdateProfileRequest, token: string): Promise<AuthResponse['user']> => {
  const response = await authApi.put('/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Request a password reset
 */
export const forgotPassword = async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
  const response = await authApi.post('/forgot-password', data);
  return response.data;
};

/**
 * Reset password with token
 */
export const resetPassword = async (data: ResetPasswordRequest): Promise<{ message: string }> => {
  const response = await authApi.post('/reset-password', data);
  return response.data;
};

/**
 * Logout (client-side only, no API call)
 */
export const logout = (): void => {
  // Clear tokens from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenExpiry');
};