import React, { useState } from "react";
import { loginFormStyles } from './LoginForm.styles';
import { Input } from "../../atoms/Input/Input";
import { Button } from "../../atoms/Button/Button";
import IconWrapper from "../../atoms/IconWrapper/IconWrapper";

type LoginFormProps = {
    onSubmit: (username: string, password: string) => void;
    error?: string;
    variant?: keyof typeof loginFormStyles['variants'];
    imageUrl?: string;
    logoUrl?: string;
};

const LoginForm: React.FC<LoginFormProps> = ({
    onSubmit,
    error,
    variant = 'default',
    imageUrl,
    logoUrl
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        onSubmit(username, password); // Execute the onSubmit callback with username and password
    };

    // Dynamically apply variant styles based on the selected variant
    const variantStyles = loginFormStyles.applyVariant(variant, imageUrl);

    return (
        <form className={typeof variantStyles === 'object' ? variantStyles.base : variantStyles} onSubmit={handleSubmit}>
            {variant === 'withImage' && imageUrl && (
                <div style={{ backgroundImage: `url(${imageUrl})` }} className={variantStyles.imageSection}></div>
            )}

            <div className={typeof variantStyles === 'object' ? variantStyles.content : loginFormStyles.content}>
                <h2 className={loginFormStyles.title}>Welcome Back</h2>

                {variant === 'withLogo' && logoUrl && (
                    <img src={logoUrl} alt="App Logo" className={loginFormStyles.logo} />
                )}

                {error && (
                    <div className={loginFormStyles.errorWrapper}>
                        <IconWrapper iconName="FaExclamationCircle" className={loginFormStyles.errorIcon} />
                        <p className={loginFormStyles.errorMessage}>{error}</p>
                    </div>
                )}

                {variant === 'floatingLabels' ? (
                    <>
                        <div className={loginFormStyles.variants.floatingLabels.inputWrapper}>
                            <label htmlFor="username" className={loginFormStyles.variants.floatingLabels.label}>Username</label>
                            <Input
                                id="username"
                                type="text"
                                className={loginFormStyles.variants.floatingLabels.input}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className={loginFormStyles.variants.floatingLabels.inputWrapper}>
                            <label htmlFor="password" className={loginFormStyles.variants.floatingLabels.label}>Password</label>
                            <Input
                                id="password"
                                type="password"
                                className={loginFormStyles.variants.floatingLabels.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </>
                ) : (
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
                )}

                <Button variant="primary" className={loginFormStyles.submitButton}>
                    Log In
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
