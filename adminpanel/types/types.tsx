// /src/types/index.ts
export interface BaseResponse {
  success: boolean;
  error: string | null;
}

// Event Types
export interface EventPortfolio {
  id: string;
  title: string;
  slug: string;
  date: string;
  eventType: string;
  location: string;
  coverImageUrl: string;
  galleryImages: string[];
  shortSummary?: string;
  fullDescription?: string;
  reviewText?: string;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventFormData {
  title: string;
  slug: string;
  eventType: string;
  date: string;
  location: string;
  shortSummary: string;
  fullDescription: string;
  coverImageUrl: string;
  galleryImages: string[];
  reviewText: string;
  isFeatured?: boolean;
}

// Login Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse extends BaseResponse {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

// API Response Types
export interface ApiResponse<T = any> extends BaseResponse {
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Table Types
export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

// Component Props Types
export interface InputFieldProps {
  name: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface SelectFieldProps extends InputFieldProps {
  options: Array<{ label: string; value: string }> | string[];
}

// Service Types
export interface ServiceResponse<T = any> {
  data?: T;
  error?: Error;
  metadata?: {
    cached: boolean;
    duration: number;
  };
}