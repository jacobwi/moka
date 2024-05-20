import { config } from '../config/config';
import axiosInstance from '../axiosInstance'; // Ensure you have an Axios instance with interceptors set up
import { handleApiRequest } from '../utils/apiUtils';
import { UserDto, UserLoginDto, UserRegisterDto } from '..';
import dynamicStorage from '../utils/dynamicStorage';

const API_BASE_URL = config.apiBaseUrl;
// const isExtensionEnvironment =
//   typeof browser !== "undefined" ||
//   (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id);
// Use the abstract storage object

// authService updated to use the abstract storage
const authService = {
  login: async (loginData: UserLoginDto): Promise<UserDto> => {
    const loginRequest = () =>
      axiosInstance.post(`${API_BASE_URL}/login`, loginData);
    const response = await handleApiRequest(loginRequest);

    if (!response.success) {
      throw new Error(response.errorMessage);
    }
    const { jwtToken } = response.data;
    await dynamicStorage.setItem('accessToken', jwtToken); // Use storage.setItem

    const user = mapTokenToUser(jwtToken);
    return user;
  },

  logout: async () => {
    await dynamicStorage.removeItem('accessToken'); // Use storage.removeItem
  },

  register: async (registerData: UserRegisterDto): Promise<UserDto> => {
    const registerRequest = () =>
      axiosInstance.post(`${API_BASE_URL}/register`, registerData);
    const response = await handleApiRequest(registerRequest);
    if (!response.success) {
      throw new Error(response.errorMessage);
    }
    const { jwtToken } = response.data;
    await dynamicStorage.setItem('accessToken', jwtToken); // Use storage.setItem

    const user = mapTokenToUser(jwtToken);
    return user;
  },

  validateToken: async (): Promise<UserDto | null> => {
    const accessToken = await dynamicStorage.getItem('accessToken'); // Use storage.getItem
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const user = mapTokenToUser(accessToken);
    return user;
  },
};

const mapTokenToUser = (token: string): UserDto => {
  const decodedToken = decodeToken(token);
  return {
    id: decodedToken.userId,
    username: decodedToken.unique_name,
    email: decodedToken.email,
    accessToken: token,
  };
};
const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default authService;
