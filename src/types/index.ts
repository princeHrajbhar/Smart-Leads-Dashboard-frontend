import type { LeadStatus, LeadSource } from './enums';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SALES';
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  source: LeadSource;
  note?: string; // Changed from 'notes' to 'note'
  createdAt: string;
  updatedAt: string;
  assignedTo?: User;
}

// Re-export from enums
export type { LeadStatus, LeadSource };

export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  role?: 'ADMIN' | 'SALES';
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface LeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'latest' | 'oldest';
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}