import {
  MemoryRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import { LoginPage, SignupPage } from '@shared/ui';
import { ProtectedRoute } from '@shared/routes';
import { AuthProvider } from '@shared/contexts/AuthContext';
import { BookmarkProvider } from '@shared/contexts/BookmarkContext';
import {
  IoHomeOutline,
  IoSettingsOutline,
  IoBookmarkOutline,
  IoAddCircleOutline,
  IoClose,
  IoRemove,
  IoSquareOutline,
} from 'react-icons/io5';
import SettingsPage from '../SettingsPage';
import { BookmarksPage } from '../BookmarksPage';
import AddBookmarkPage from '../AddBookmarkPage';
import HomePage from '../HomePage';

export const Popup = () => {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <Layout>
                  <LoginPage />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout>
                  <SignupPage />
                </Layout>
              }
            />
            <Route
              path="/dashboard"
              element={<LayoutWithPrivateRoute component={HomePage} />}
            />
            <Route
              path="/"
              element={<LayoutWithPrivateRoute component={HomePage} />}
            />

            <Route
              path="/bookmarks/add"
              element={<LayoutWithPrivateRoute component={AddBookmarkPage} />}
            />
            <Route
              path="/bookmarks"
              element={<LayoutWithPrivateRoute component={BookmarksPage} />}
            />
            <Route
              path="/settings"
              element={<LayoutWithPrivateRoute component={SettingsPage} />}
            />
          </Routes>
        </Router>
      </BookmarkProvider>
    </AuthProvider>
  );
}

const LayoutWithPrivateRoute = ({
  component: Component,
}: {
  component: React.ComponentType;
}) => {
  return (
    <ProtectedRoute>
      <Layout>
        <Component />
      </Layout>
    </ProtectedRoute>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const handleClose = () => {
    // Implement the close functionality, e.g., window.close() for a browser window
    window.close();
  };

  const handleMinimize = () => {
    // Implement the minimize functionality, this might be specific to your application or platform
    console.log('Minimize window');
  };

  const handleExport = () => {
    // Get the current extension's manifest
    const manifest = chrome.runtime.getManifest();

    // Extract the popup's HTML file path from the manifest
    const popupPath = manifest?.action?.default_popup;

    if (popupPath) {
      // Get the full URL of the popup page
      const popupUrl = chrome.runtime.getURL(popupPath);

      // Open the popup content in a new window
      chrome.windows.create(
        {
          url: popupUrl,
          type: 'popup', // Or 'normal', depending on your preference
          focused: true,
          width: document.documentElement.scrollWidth + 10,
          height: document.documentElement.scrollHeight + 30,
        },
        newWindow => {
          console.log('New window opened:', newWindow);
          window.close(); // Close the current popup window
        }
      );
    } else {
      console.error('Popup path not found in manifest.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-2 bg-gradient-to-r from-theme-accent to-theme-accent-hover shadow-md text-white">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-theme-accent rounded-full flex items-center justify-center">
            {/* Placeholder for app icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-white fill-current"
            >
              {/* Your SVG icon here */}
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-wide animate-pulse">
            ByteBookmarks
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleMinimize}
            className="p-1 rounded-full hover:bg-theme-accent-hover transition duration-150 ease-in-out"
          >
            <IoRemove size={20} />
          </button>
          <button
            onClick={handleExport}
            className="p-1 rounded-full hover:bg-theme-accent-hover transition duration-150 ease-in-out"
          >
            <IoSquareOutline size={20} />
          </button>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-red-500 transition duration-150 ease-in-out"
          >
            <IoClose size={20} />
          </button>
        </div>
      </div>
      {/* Content Area with Padding for Bottom Nav */}
      <div className="flex-grow overflow-auto pb-20">{children}</div>
      {/* Bottom Navigation Bar */}
      <div className="flex justify-around p-2 bg-white shadow fixed bottom-0 left-0 right-0">
        {[
          {
            icon: <IoAddCircleOutline size={24} />,
            label: 'Add',
            to: '/bookmarks/add',
            end: true,
          },
          {
            icon: <IoHomeOutline size={24} />,
            label: 'Home',
            to: '/',
            end: true,
          },
          {
            icon: <IoBookmarkOutline size={24} />,
            label: 'Bookmarks',
            to: '/bookmarks',
            end: true,
          },
          {
            icon: <IoSettingsOutline size={24} />,
            label: 'Settings',
            to: '/settings',
            end: true,
          },
        ].map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center text-gray-600 hover:text-theme-accent transition-colors duration-150 ease-in-out ${isActive ? 'text-theme-accent' : ''}`
            }
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
