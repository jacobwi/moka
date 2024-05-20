import { createContext, useState, useEffect } from 'react';
import { useAuth } from '@shared/hooks';

export interface UserSettings {
  notificationsEnabled: boolean;
  darkModeEnabled: boolean;
  language: string;
  colorScheme: string;
  apiKey: string;
  layout: string;
}

type UserSettingsContextType = {
  settings: UserSettings;
  setDarkMode: (darkMode: boolean) => void;
  setLanguage: (language: string) => void;
  setNotifications: (notifications: boolean) => void;
  setColorScheme: (colorScheme: string) => void;
  setLayout: (layout: string) => void;
};

const defaultSettings: UserSettings = {
  notificationsEnabled: false,
  darkModeEnabled: false,
  language: 'en',
  colorScheme: 'default',
  apiKey: '',
  layout: 'main',
};

export const UserSettingsContext = createContext<UserSettingsContextType>({
  settings: defaultSettings,
  setDarkMode: () => {},
  setLanguage: () => {},
  setNotifications: () => {},
  setColorScheme: () => {},
  setLayout: () => {},
});

export const UserSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const savedSettings = localStorage.getItem('user-settings');
    if (savedSettings) {
      const loadedSettings = JSON.parse(savedSettings);
      setSettings(loadedSettings);
      document.documentElement.setAttribute(
        'data-theme',
        loadedSettings.colorScheme
      );
    }
  }, []);

  useEffect(() => {
    // Persist user settings
    if (isAuthenticated) {
      localStorage.setItem('user-settings', JSON.stringify(settings));
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [settings, isAuthenticated]);
  useEffect(() => {
    if (settings.darkModeEnabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkModeEnabled]);
  const setDarkMode = (darkMode: boolean) => {
    setSettings(currentSettings => ({
      ...currentSettings,
      darkModeEnabled: darkMode,
    }));
    if (!isAuthenticated) {
      // Save theme for guests separately
      localStorage.setItem(
        'guest-theme',
        JSON.stringify({ darkModeEnabled: darkMode })
      );
    }
  };

  const setLanguage = (language: string) => {
    setSettings(currentSettings => ({ ...currentSettings, language }));
  };

  const setNotifications = (notifications: boolean) => {
    setSettings(currentSettings => ({
      ...currentSettings,
      notificationsEnabled: notifications,
    }));
  };

  const setColorScheme = (colorScheme: string) => {
    setSettings(currentSettings => ({ ...currentSettings, colorScheme }));
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', colorScheme);

    if (!isAuthenticated) {
      // Optionally, save color scheme for guests separately if needed
    }
  };

  const setLayout = (layout: string) => {
    setSettings(currentSettings => ({ ...currentSettings, layout }));
  };

  return (
    <UserSettingsContext.Provider
      value={{
        settings,
        setDarkMode,
        setLanguage,
        setNotifications,
        setColorScheme,
        setLayout,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};
