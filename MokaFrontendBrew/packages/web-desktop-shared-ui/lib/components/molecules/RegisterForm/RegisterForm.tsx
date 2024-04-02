import React, { useState } from "react";
import { registerFormStyles } from "./RegisterForm.styles";
import { Input } from "../../atoms/Input/Input";
import { Button } from "../../atoms/Button/Button";

type RegisterFormProps = {
  onSubmit: (username: string, email: string, password: string) => void;
  error?: string;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, error }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, email, password);
  };

  return (
    <form className={registerFormStyles.base} onSubmit={handleSubmit}>
      <h2 className={registerFormStyles.title}>Sign Up</h2>

      {error && <div className={registerFormStyles.errorMessage}>{error}</div>}

      <Input
        type="text"
        placeholder="Username"
        className={registerFormStyles.inputField}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        type="email"
        placeholder="Email"
        className={registerFormStyles.inputField}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        className={registerFormStyles.inputField}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="primary" className={registerFormStyles.submitButton}>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
