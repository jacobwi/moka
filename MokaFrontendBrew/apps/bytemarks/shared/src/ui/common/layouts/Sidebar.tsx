import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdSettings, MdBookmark, MdPerson } from 'react-icons/md';
import { useAuth } from '../../../hooks/useAuth';

const Sidebar = () => {
  const { logout } = useAuth();

  const baseClass =
    'flex items-center justify-center w-12 h-12 transition-all duration-300';
  const linkClass = `${baseClass} hover:bg-slate-600 hover:bg-opacity-50 rounded-lg`;
  const activeClass = `${baseClass} bg-slate-600 bg-opacity-50 rounded-lg`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to close the menu
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    // Function to handle document click
    const handleDocumentClick = (e: MouseEvent) => {
      // Close the menu if the click is outside the menu
      if (!(e.target as Element).closest('.menu-container') && isMenuOpen) {
        closeMenu();
      }
    };

    // Add click event listener to the document when the menu is open
    if (isMenuOpen) {
      document.addEventListener('click', handleDocumentClick);
    }

    // Cleanup the event listener when the component unmounts or the menu is closed
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isMenuOpen]);

  return (
    <aside className="fixed top-0 left-0 flex flex-col items-center bg-theme-card-bg min-h-screen shadow-lg p-4 justify-between">
      <nav className="space-y-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          <MdDashboard size="24" className="text-theme-text" />
        </NavLink>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          <MdBookmark size="24" className="text-theme-text" />
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          <MdSettings size="24" className="text-theme-text" />
        </NavLink>
      </nav>
      <div
        className="mt-auto relative menu-container"
        onMouseEnter={() => setIsMenuOpen(true)}
      >
        <button className="w-12 h-12 rounded-full bg-theme-accent hover:bg-theme-accent-hover transition-all duration-300 flex items-center justify-center">
          <MdPerson size="24" className="text-white" />
        </button>
        {isMenuOpen && (
          <div className="absolute bottom-14 w-48 bg-white shadow-lg rounded-lg p-2 z-10">
            <NavLink
              to="/user/profile"
              className="block p-2 hover:bg-gray-100 rounded-lg"
              onClick={closeMenu}
            >
              Profile
            </NavLink>
            <NavLink
              to="/user/settings"
              className="block p-2 hover:bg-gray-100 rounded-lg"
              onClick={closeMenu}
            >
              User Settings
            </NavLink>
            <button
              onClick={logout}
              className="block p-2 hover:bg-gray-100 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
