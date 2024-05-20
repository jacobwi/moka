export interface UserDto {
  id: string;
  username: string;
  email: string;
  accessToken: string; // JWT containing the JwtPayload
}
