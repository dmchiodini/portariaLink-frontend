export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'PORTER' | string;
  condominiumId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
};
