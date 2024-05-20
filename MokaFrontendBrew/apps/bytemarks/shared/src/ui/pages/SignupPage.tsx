import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@shared/hooks';
import { Loading } from '@shared/ui';
import { UserRegisterDto } from '@shared/models';

export const SignupPage = () => {
  const [userRegisterDto, setUserRegister] = useState<UserRegisterDto>({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await register(userRegisterDto);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign up. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-theme-bg min-h-screen">
      <div className="w-full max-w-md p-8 bg-theme-card-bg rounded-lg shadow-lg text-theme-text">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        {error && <div className="text-center text-red-500 mt-2">{error}</div>}
        {isLoading ? (
          <div className="mt-4 flex justify-center">
            <Loading />
          </div>
        ) : (
          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={userRegisterDto.email}
                onChange={e =>
                  setUserRegister({ ...userRegisterDto, email: e.target.value })
                }
                className="px-4 py-2 border border-theme-border rounded-md focus:ring-2 focus:ring-theme-accent focus:border-theme-accent bg-theme-input-bg text-theme-input-text"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm font-medium mb-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={userRegisterDto.username}
                onChange={e =>
                  setUserRegister({
                    ...userRegisterDto,
                    username: e.target.value,
                  })
                }
                className="px-4 py-2 border border-theme-border rounded-md focus:ring-2 focus:ring-theme-accent focus:border-theme-accent bg-theme-input-bg text-theme-input-text"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={userRegisterDto.password}
                onChange={e =>
                  setUserRegister({
                    ...userRegisterDto,
                    password: e.target.value,
                  })
                }
                className="px-4 py-2 border border-theme-border rounded-md focus:ring-2 focus:ring-theme-accent focus:border-theme-accent bg-theme-input-bg text-theme-input-text"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-theme-accent text-theme-button-text hover:bg-theme-accent-hover rounded-md transition duration-300"
            >
              Sign Up
            </button>
          </form>
        )}
        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-theme-accent hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
