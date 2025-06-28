import axios from 'axios';
import type { AxiosResponse } from 'axios';

// Configure axios defaults
const API_BASE_URL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

// API functions
export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  async getProfile(): Promise<{ user: User }> {
    const response: AxiosResponse<{ user: User }> = await axiosInstance.get('/auth/profile');
    return response.data;
  },

  initiateGoogleLogin(): void {
    window.location.href = `${API_BASE_URL}/auth/google`;
  },

  logout(): void {
    localStorage.removeItem('auth_token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
};

export const dashboardApi = {
  async getStats(): Promise<{ success: boolean; data: unknown; user: User }> {
    const response = await axiosInstance.get('/dashboard/stats');
    return response.data;
  },

  async getProgress(): Promise<{ success: boolean; data: unknown }> {
    const response = await axiosInstance.get('/dashboard/progress');
    return response.data;
  }
};

export default axiosInstance;
