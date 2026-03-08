import { AuthCredentials, AuthResponse, User } from '@/types';
import { apiService } from './api';

/**
 * Authentication Service - Handles login, register, logout, and token management
 */
class AuthService {
  /**
   * Login user
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);

    if (response.success && response.data) {
      apiService.setTokens(response.data.accessToken, response.data.refreshToken);
      return response.data;
    }

    throw new Error(response.error || 'Login failed');
  }

  /**
   * Register new user
   */
  async register(
    credentials: AuthCredentials & { name: string }
  ): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', credentials);

    if (response.success && response.data) {
      apiService.setTokens(response.data.accessToken, response.data.refreshToken);
      return response.data;
    }

    throw new Error(response.error || 'Registration failed');
  }

  /**
   * Logout user
   */
  logout(): void {
    apiService.clearTokens();
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>('/auth/me');

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to fetch current user');
  }

  /**
   * Refresh token
   */
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiService.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });

    if (response.success && response.data) {
      apiService.setTokens(response.data.accessToken, response.data.refreshToken);
      return response.data;
    }

    throw new Error(response.error || 'Token refresh failed');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  /**
   * Update user profile
   */
  async updateProfile(name: string, avatar?: string): Promise<User> {
    const response = await apiService.put<User>('/auth/profile', {
      name,
      avatar,
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to update profile');
  }

  /**
   * Change password
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    const response = await apiService.post('/auth/change-password', {
      oldPassword,
      newPassword,
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to change password');
    }
  }
}

export const authService = new AuthService();

export default AuthService;
