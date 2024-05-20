import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@shared/hooks';
import { ReactNode } from 'react'; // Import ReactNode type

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // Explicitly type children as ReactNode
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // If the user is authenticated, render the children components
};
