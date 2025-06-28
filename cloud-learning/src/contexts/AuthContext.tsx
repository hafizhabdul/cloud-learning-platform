import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { authApi } from '../services/apiClient';
import type { User, LoginRequest, RegisterRequest } from '../services/apiClient';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const initializeAuth = async () => {
      // Check for Google OAuth token in URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      
      if (token) {
        localStorage.setItem('auth_token', token);
        // Clear the token from URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      if (authApi.isAuthenticated()) {
        try {
          const response = await authApi.getProfile();
          setUser(response.user);
        } catch (error) {
          console.error('Failed to get user profile:', error);
          authApi.logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    try {
      const response = await authApi.login(credentials);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    setLoading(true);
    try {
      const response = await authApi.register(userData);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    authApi.initiateGoogleLogin();
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const updateUserProfile = async (_data: Partial<User>) => {
    // Note: This endpoint doesn't exist yet in the new API
    // await authApi.updateProfile(data);
    // Refresh user profile
    const response = await authApi.getProfile();
    setUser(response.user);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
