export interface JwtPayload {
  sub: string;
  role: 'ADMIN' | 'PORTER' | string;
  condominiumId: string;
  iat?: number;
  exp?: number;
}