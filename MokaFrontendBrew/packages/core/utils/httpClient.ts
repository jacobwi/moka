// packages/core/src/utils/httpClient.ts
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { APIError } from "@moka/errors";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Use environment variable
});

// Request Interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add authentication token (if available)
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers = config.headers || {}; // Ensure headers exists
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.clear(); // Initialize headers as an empty object
    }
    return config;
  }
  // Error handling for request could go here
);

// Response Interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => response, // Successful response pass-through
  (error) => {
    // Handle errors, transform into APIError
    if (error.response) {
      throw new APIError(
        error.response.data.message || "API Error",
        error.response.status
      );
    } else {
      // Network error or something else
      throw new APIError("Network Error", 500);
    }
  }
);

export default instance;
