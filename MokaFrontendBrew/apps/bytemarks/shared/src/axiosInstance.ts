// src/axiosInstance.js
import axios from 'axios';
import { config } from './config/config';
import dynamicStorage from './utils/dynamicStorage'; // Make sure the path is correct

const API_BASE_URL = config.apiBaseUrl;

// Create an Axios instance with predefined configurations
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to the Axios instance
axiosInstance.interceptors.request.use(
  async config => {
    // Use an immediately-invoked asynchronous function to handle token retrieval
    await (async () => {
      try {
        const token = await dynamicStorage.getItem('accessToken');

        // If the token exists, set the Authorization header for all requests
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        // Handle potential errors from retrieving the token
        console.error('Error retrieving token from storage:', error);
        // You may choose how to handle errors here, perhaps by redirecting to a login page, etc.
      }
    })();

    return config;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
