export const AuthErrorCodes = {
  INVALID_CREDENTIALS: {
    code: "AUTH_001",
    description: "Invalid username or password",
    resolutions: ["Retry with correct credentials", "Use password recovery"],
  },
  TOKEN_EXPIRED: {
    code: "AUTH_002",
    description: "Authentication token has expired",
    resolutions: ["Refresh token", "Prompt user to re-authenticate"],
  },
};
