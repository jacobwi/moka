import { useContext } from 'react';
import { UserSettingsContext } from '@shared/contexts';

const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error(
      'useUserSettings must be used within a UserSettingsProvider'
    );
  }
  return context;
};

export default useUserSettings;
