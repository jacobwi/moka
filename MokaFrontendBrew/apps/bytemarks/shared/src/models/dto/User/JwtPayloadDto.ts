export interface JwtPayload {
  unique_name: string;
  userId: string;
  email: string;
  jti: string;
  role: string;
  iat: number;
  exp: number;
}
