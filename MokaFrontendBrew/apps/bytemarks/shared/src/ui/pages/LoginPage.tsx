import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/hooks';
import { UserLoginDto } from '@shared/models';
import { Loading } from '@shared/ui';
export const LoginPage = () => {
  const [userLoginDto, setUserLogin] = useState<UserLoginDto>({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, login, isAuthenticating } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticating && user) navigate('/dashboard');
  }, [user, navigate, isAuthenticating]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(userLoginDto);
      // navigate("/dashboard");
    } catch (error) {
      console.error('Failed to login', error);
      setError('Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-theme-bg">
      <div className="w-full max-w-md p-8 space-y-8 bg-theme-card-bg shadow-lg rounded-xl text-theme-text">
        <h2 className="text-3xl font-bold text-center">Welcome Back!</h2>
        <p className="text-sm text-center">Login to continue to your account</p>
        {error && (
          <div className="p-4 mb-4 text-sm bg-red-100 rounded-lg text-theme-accent">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              className="w-full px-4 py-3 text-sm border rounded-lg focus:ring-theme-accent focus:border-theme-accent"
              type="text"
              placeholder="Username"
              value={userLoginDto.username}
              onChange={e =>
                setUserLogin({ ...userLoginDto, username: e.target.value })
              }
              required
            />
          </div>
          <div>
            <input
              className="w-full px-4 py-3 text-sm border rounded-lg focus:ring-theme-accent focus:border-theme-accent"
              type="password"
              placeholder="Password"
              value={userLoginDto.password}
              onChange={e =>
                setUserLogin({ ...userLoginDto, password: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-sm font-medium text-white rounded-lg bg-theme-accent hover:bg-theme-accent-hover focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : 'Log In'}
          </button>
          <Link
            to="/forgot-password"
            className="text-sm hover:underline text-theme-accent"
          >
            Forgot password?
          </Link>
        </form>
        <div className="text-center">
          <p className="text-sm">Don't have an account?</p>
          <Link
            to="/register"
            className="font-medium hover:underline text-theme-accent"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
