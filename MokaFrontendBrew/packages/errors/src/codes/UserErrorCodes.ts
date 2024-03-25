export const UserErrorCodes = {
  NOT_FOUND: {
    code: "USER_001",
    description: "The specified user could not be found.",
    resolutions: ["Verify the ID and try again"],
  },
  EMAIL_IN_USE: {
    code: "USER_002",
    description: "A user with this email address already exists.",
    resolutions: [
      "Use a different email",
      "Try logging in using the existing account.",
    ],
  },
  CREATION_FAILED: {
    code: "USER_003",
    description: "Failed to create a new user account.",
    resolutions: ["Retry the operation", "Check network connectivity"],
  },
};
