import { Link } from 'react-router-dom';
import { useAuth } from '@shared/hooks';

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="h-full flex items-center justify-center bg-theme-bg">
      <div className="text-center p-8 max-w-lg bg-theme-card-bg rounded-2xl shadow-2xl transform transition duration-500 ">
        <h1 className="text-5xl font-extrabold text-theme-text sm:text-6xl">
          Secure Bookmark App 👋
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-theme-text">
          Keep your bookmarks safe and accessible from anywhere.
        </p>
        <Link
          to={user ? '/dashboard' : '/login'}
          className="mt-10 inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-semibold rounded-full text-theme-button-text bg-theme-accent hover:bg-theme-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-accent transition-all duration-300 ease-in-out"
        >
          {user ? '🚀 Go to Dashboard' : '🔐 Sign in to Manage Securely'}
        </Link>
      </div>
    </div>
  );
};
