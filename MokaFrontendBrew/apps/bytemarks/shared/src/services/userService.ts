import axiosInstance from '../axiosInstance'; // Ensure you have an Axios instance with interceptors set up
import { handleApiRequest } from '../utils/apiUtils';
import { config } from '../config/config';

const API_BASE_URL = `${config.apiBaseUrl}/api`;

const userService = {
  getUserProfile: async (userId: string) => {
    const fetchUserProfile = () =>
      axiosInstance.get(`${API_BASE_URL}/user/${userId}/profile`);
    return handleApiRequest(fetchUserProfile);
  },
  updateUserProfile: async (userId: string, profileData: any) => {
    const updateUserProfile = () =>
      axiosInstance.put(`${API_BASE_URL}/user/${userId}/profile`, profileData);
    return handleApiRequest(updateUserProfile);
  },

  updateUserAvatar: async (userId: string, avatarFile: FormData) => {
    const updateUserAvatar = () =>
      axiosInstance.put(
        `${API_BASE_URL}/user/${userId}/profile/avatar`,
        avatarFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

    return handleApiRequest(updateUserAvatar);
  },
};

export default userService;
