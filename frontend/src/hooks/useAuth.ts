/**
 * Authentication hook for managing user authentication state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthResponse } from '@/types/auth';
import * as authApi from '@/api/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  tokenExpiry: number | null; // timestamp in milliseconds
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    instrument?: string
  ) => Promise<void>;
  logout: () => void;
  refreshTokenFn: () => Promise<boolean>;
  clearError: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      tokenExpiry: null,
      isAuthenticated: false,
      isInitialized: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authApi.login({ email, password });
          
          const { user, token, refreshToken, expiresIn } = response;
          const tokenExpiry = Date.now() + expiresIn * 1000;
          
          set({
            user,
            token,
            refreshToken,
            tokenExpiry,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Login failed',
            isInitialized: true,
          });
        }
      },
      
      register: async (email, password, firstName, lastName, instrument) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authApi.register({
            email,
            password,
            firstName,
            lastName,
            instrument,
          });
          
          const { user, token, refreshToken, expiresIn } = response;
          const tokenExpiry = Date.now() + expiresIn * 1000;
          
          set({
            user,
            token,
            refreshToken,
            tokenExpiry,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Registration failed',
            isInitialized: true,
          });
        }
      },
      
      logout: () => {
        authApi.logout();
        set({
          user: null,
          token: null,
          refreshToken: null,
          tokenExpiry: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },
      
      refreshTokenFn: async () => {
        const { refreshToken } = get();
        
        if (!refreshToken) {
          set({ isAuthenticated: false });
          return false;
        }
        
        try {
          const response = await authApi.refreshToken({ refreshToken });
          
          const { user, token, refreshToken: newRefreshToken, expiresIn } = response;
          const tokenExpiry = Date.now() + expiresIn * 1000;
          
          set({
            user,
            token,
            refreshToken: newRefreshToken,
            tokenExpiry,
            isAuthenticated: true,
            isInitialized: true,
          });
          
          return true;
        } catch (error) {
          set({
            user: null,
            token: null,
            refreshToken: null,
            tokenExpiry: null,
            isAuthenticated: false,
            isInitialized: true,
          });
          
          return false;
        }
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        tokenExpiry: state.tokenExpiry,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);