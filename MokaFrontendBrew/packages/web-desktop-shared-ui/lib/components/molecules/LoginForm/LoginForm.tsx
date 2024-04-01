import React, { useState } from "react";
import { loginFormStyles } from "./LoginForm.styles";
import { Input } from "../../atoms/Input/Input";
import { Button } from "../../atoms/Button/Button";
import IconWrapper from "../../atoms/IconWrapper/IconWrapper";

type LoginFormProps = {
  onSubmit: (username: string, password: string) => void;
  error?: string;
  variant?: keyof (typeof loginFormStyles)["variants"];
  imageUrl?: string;
  logoUrl?: string;
  onForgotPassword?: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  error,
  variant = "default",
  imageUrl,
  logoUrl,
  onForgotPassword,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    onSubmit(username, password); // Execute the onSubmit callback with username and password
  };

  // Dynamically apply variant styles based on the selected variant
  const variantStyles = loginFormStyles.applyVariant(variant, imageUrl);

  return (
    <form
      className={
        typeof variantStyles === "object" ? variantStyles.base : variantStyles
      }
      onSubmit={handleSubmit}
    >
      {variant === "withImage" && imageUrl && (
        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
          className={variantStyles.imageSection}
        ></div>
      )}

      <div
        className={
          typeof variantStyles === "object"
            ? variantStyles.content
            : loginFormStyles.content
        }
      >
        <h2 className={loginFormStyles.title}>Welcome Back</h2>

        {variant === "withLogo" && logoUrl && (
          <img src={logoUrl} alt="App Logo" className={loginFormStyles.logo} />
        )}

        {error && (
          <div className={loginFormStyles.errorWrapper}>
            <IconWrapper
              iconName="FaExclamationCircle"
              className={loginFormStyles.errorIcon}
            />
            <p className={loginFormStyles.errorMessage}>{error}</p>
          </div>
        )}

        <>
          <Input
            type="text"
            placeholder="Username"
            iconName="FaUser"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            iconName="FaLock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>

        {/* Remember Me Checkbox and Forgot Password Link */}
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="form-checkbox rounded text-blue-600 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Remember Me</span>
          </label>

          {onForgotPassword && (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              aria-label="Forgot Password"
            >
              Forgot Password?
            </button>
          )}
        </div>

        <Button variant="primary" className={loginFormStyles.submitButton}>
          Log In
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
