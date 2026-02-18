export interface User {
  id: string;
  email: string;
  companyName: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}