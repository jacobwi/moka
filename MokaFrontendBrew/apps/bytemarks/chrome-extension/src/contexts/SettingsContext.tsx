import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the shape of your settings context
interface SettingsContextProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  defaultPopupView: string;
  setDefaultPopupView: Dispatch<SetStateAction<string>>;
  autoSave: boolean;
  setAutoSave: Dispatch<SetStateAction<boolean>>;
  autoAddTag: string;
  setAutoAddTag: Dispatch<SetStateAction<string>>;
  apiUrl: string;
  setApiUrl: Dispatch<SetStateAction<string>>;
}

const SettingsContext = createContext<SettingsContextProps>({
  theme: "Light",
  setTheme: () => {},
  defaultPopupView: "Home",
  setDefaultPopupView: () => {},
  autoSave: false,
  setAutoSave: () => {},
  autoAddTag: "",
  setAutoAddTag: () => {},
  apiUrl: "",
  setApiUrl: () => {},
});

// SettingsProvider component
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("Light");
  const [defaultPopupView, setDefaultPopupView] = useState("Home");
  const [autoSave, setAutoSave] = useState(false);
  const [autoAddTag, setAutoAddTag] = useState("");
  const [apiUrl, setApiUrl] = useState("");

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        defaultPopupView,
        setDefaultPopupView,
        autoSave,
        setAutoSave,
        autoAddTag,
        setAutoAddTag,
        apiUrl,
        setApiUrl,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// useSettings custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => useContext(SettingsContext);
