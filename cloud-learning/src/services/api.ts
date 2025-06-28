// API Configuration and Client
const API_BASE_URL = 'http://localhost:8080/api/v1';

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface ProgressData {
  course_id: string;
  module_id: string;
  lesson_id?: string;
  is_completed: boolean;
  score?: number;
  time_spent?: number;
}

interface QuizResult {
  quiz_id: string;
  course_id: string;
  score: number;
  max_score: number;
  answers: string;
  time_spent: number;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage if available
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getProfile(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/profile');
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse> {
    return this.request<ApiResponse>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Progress methods
  async getUserProgress(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/progress');
  }

  async updateCourseProgress(data: ProgressData): Promise<ApiResponse> {
    return this.request<ApiResponse>('/progress/course', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async submitQuizResult(data: QuizResult): Promise<ApiResponse> {
    return this.request<ApiResponse>('/progress/quiz', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getQuizResults(quizId?: string): Promise<ApiResponse> {
    const query = quizId ? `?quiz_id=${quizId}` : '';
    return this.request<ApiResponse>(`/progress/quiz${query}`);
  }

  async submitLabProgress(data: {
    lab_id: string;
    step_number: number;
    is_completed: boolean;
    notes?: string;
  }): Promise<ApiResponse> {
    return this.request<ApiResponse>('/progress/lab', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDashboardStats(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/dashboard/stats');
  }

  // Community methods
  async getDiscussions(params?: {
    page?: number;
    limit?: number;
    category?: string;
    sort?: string;
  }): Promise<ApiResponse> {
    const query = params ? '?' + new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined) acc[key] = value.toString();
        return acc;
      }, {} as Record<string, string>)
    ) : '';
    
    return this.request<ApiResponse>(`/discussions${query}`);
  }

  async createDiscussion(data: {
    title: string;
    content: string;
    category?: string;
    tags?: string[];
  }): Promise<ApiResponse> {
    return this.request<ApiResponse>('/discussions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDiscussion(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/discussions/${id}`);
  }

  async replyToDiscussion(id: string, content: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/discussions/${id}/reply`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  async likeDiscussion(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/discussions/${id}/like`, {
      method: 'POST',
    });
  }

  // Utility methods
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types for use in components
export type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ProgressData,
  QuizResult,
  ApiResponse,
};
