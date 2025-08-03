// API Error types
export interface ApiError {
  message: string;
  status: number;
  details?: string[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  error: string;
  details?: ValidationError[];
  retryAfter?: number;
}

// Network error types
export interface NetworkError {
  message: string;
  code: string;
  isNetworkError: true;
}

// Form error types
export interface FormError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: FormError[];
}

// Auth error types
export interface AuthError {
  message: string;
  type: 'TOKEN_EXPIRED' | 'INVALID_TOKEN' | 'UNAUTHORIZED' | 'FORBIDDEN';
}

// Generic error handler type
export type ErrorHandler = (error: ApiError | NetworkError) => void;

// Error utility functions
export const isApiError = (error: unknown): error is ApiError => {
  return typeof error === 'object' && error !== null && 'status' in error;
};

export const isNetworkError = (error: unknown): error is NetworkError => {
  return typeof error === 'object' && error !== null && 'isNetworkError' in error;
};

export const isAuthError = (error: unknown): error is AuthError => {
  return typeof error === 'object' && error !== null && 'type' in error;
};

// Transform axios error to our error types
export const transformAxiosError = (error: unknown): ApiError | NetworkError => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as any; // This will be replaced with proper typing
    
    if (axiosError.response) {
      return {
        message: axiosError.response.data?.error || axiosError.response.data?.message || 'An error occurred',
        status: axiosError.response.status,
        details: axiosError.response.data?.details
      };
    } else if (axiosError.request) {
      return {
        message: 'Network error - please check your connection',
        code: 'NETWORK_ERROR',
        isNetworkError: true
      };
    }
  }
  
  return {
    message: 'An unexpected error occurred',
    status: 500
  };
};