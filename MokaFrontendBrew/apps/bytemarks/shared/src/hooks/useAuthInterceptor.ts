// src/hooks/useAuthInterceptor.ts
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const useAuthInterceptor = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const axiosInstance = axios.create(); // Create an Axios instance if you don't have one

    const authInterceptor = axiosInstance.interceptors.request.use(
      config => {
        if (user?.accessToken) {
          // Assuming your UserDto includes a token field
          config.headers['Authorization'] = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [user?.accessToken]); // Re-configure the interceptor when the token changes
};

export default useAuthInterceptor;
