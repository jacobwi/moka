// src/contexts/AuthContext.tsx
import { createContext, useState, useEffect } from 'react';
import { UserDto, UserLoginDto, UserRegisterDto } from '../models';
import authService from '../services/authService';

interface AuthContextState {
  user: UserDto | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: (loginData: UserLoginDto) => Promise<void>;
  logout: () => void;
  register: (registerData: UserRegisterDto) => Promise<void>;
}

const defaultState: AuthContextState = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
};

const AuthContext = createContext<AuthContextState>(defaultState);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthContextState>(defaultState);

  useEffect(() => {
    const initializeAuth = async () => {
      // Perform initial authentication checks here, e.g., validate token
      try {
        setState({
          ...state,
          isAuthenticating: true,
        });
        const user = await authService.validateToken();
        setState(prevState => ({
          ...prevState,
          user,
          isAuthenticated: !!user,
          isAuthenticating: false,
        }));
      } catch (error) {
        console.error('Token validation error', error);
        setState(prevState => ({
          ...prevState,
          isAuthenticating: false,
        }));
      }
    };

    initializeAuth();
  }, []);

  const login = async (loginData: UserLoginDto) => {
    try {
      const user = await authService.login(loginData);
      setState({
        ...state,
        user,
        isAuthenticated: true,
        isAuthenticating: false,
      });
    } catch (error) {
      console.error('Login error', error);
      throw error; // Rethrow to be handled by the component
    }
  };

  const logout = () => {
    setState({
      ...state,
      isAuthenticating: true,
    });
    authService.logout();
    setState({
      ...state,
      user: null,
      isAuthenticating: false,
      isAuthenticated: false,
    });
  };

  const register = async (registerData: UserRegisterDto) => {
    try {
      setState({
        ...state,
        isAuthenticating: true,
      });
      const user = await authService.register(registerData);
      setState({
        ...state,
        user,
        isAuthenticated: true,
        isAuthenticating: false,
      });
    } catch (error) {
      console.error('Registration error', error);
      throw error; // Rethrow to be handled by the component
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext itself in case it needs to be used by useContext directly
export { AuthContext };
