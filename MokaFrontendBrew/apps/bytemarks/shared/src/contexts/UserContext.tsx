import { createContext, useContext, useState, useEffect } from 'react';
import userService from '../services/userService';
import { useAuth } from '../hooks/useAuth';

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  deviceActivity: string[];
}

interface UserContextProps {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  updateAvatar: (avatarFile: File) => Promise<void>;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextProps>({
  profile: null,
  setProfile: () => {},
  updateAvatar: async () => {},
  isLoading: false,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        setIsLoading(true);
        try {
          const response = await userService.getUserProfile(user.id);
          if (response.success) {
            setProfile((response.data as unknown as Profile) || null);
          } else {
            console.error(
              'Failed to fetch user profile:',
              response.errorMessage
            );
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  const updateAvatar = async (avatarFile: File) => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const response = await userService.updateUserAvatar(user.id, formData);
      if (response.success) {
        setProfile((prev: Profile | null) => ({
          ...prev,
          avatar: (response.data?.data?.avatar as string) || '', // Access the avatar property from the data property
          id: prev?.id || '',
          firstName: prev?.firstName || '',
          lastName: prev?.lastName || '',
          deviceActivity: prev?.deviceActivity || [],
        }));
      } else {
        console.error('Failed to update avatar:', response.errorMessage);
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ profile, setProfile, updateAvatar, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
