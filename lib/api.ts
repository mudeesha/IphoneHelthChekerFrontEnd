import axios, { AxiosInstance, AxiosError } from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, ApiError } from '@/types';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

// Report endpoints
export const reportApi = {
  getReports: async () => {
    const response = await apiClient.get('/reports');
    return response.data;
  },

  getReport: async (id: string) => {
    const response = await apiClient.get(`/reports/${id}`);
    return response.data;
  },

  uploadReport: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/reports/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteReport: async (id: string) => {
    await apiClient.delete(`/reports/${id}`);
  },
};

// User endpoints
export const userApi = {
  getProfile: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: Record<string, unknown>) => {
    const response = await apiClient.put('/users/profile', data);
    return response.data;
  },
};

// Admin endpoints
export const adminApi = {
  getUsers: async (page = 1, limit = 10) => {
    const response = await apiClient.get('/admin/users', {
      params: { page, limit },
    });
    return response.data;
  },

  getUser: async (id: string) => {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, data: Record<string, unknown>) => {
    const response = await apiClient.put(`/admin/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string) => {
    await apiClient.delete(`/admin/users/${id}`);
  },

  getSubscriptions: async (page = 1, limit = 10) => {
    const response = await apiClient.get('/admin/subscriptions', {
      params: { page, limit },
    });
    return response.data;
  },

  getPayments: async (page = 1, limit = 10) => {
    const response = await apiClient.get('/admin/payments', {
      params: { page, limit },
    });
    return response.data;
  },
};

// History endpoints
export const historyApi = {
  getHistory: async (page = 1, limit = 20) => {
    const response = await apiClient.get('/history', {
      params: { page, limit },
    });
    return response.data;
  },
};

// Stats endpoints
export const statsApi = {
  getUserStats: async () => {
    const response = await apiClient.get('/stats');
    return response.data;
  },
};

export default apiClient;
