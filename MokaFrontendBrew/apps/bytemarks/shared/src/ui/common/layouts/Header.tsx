import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Logo from '@shared/assets/logos/logo.svg';
import AvatarImage from '@shared/assets/user-avatar.png';
import {
  VscSettings,
  VscMenu,
  VscChromeClose,
  VscTag,
  VscBookmark,
  VscDashboard,
} from 'react-icons/vsc';
import { MdOutlineCategory } from 'react-icons/md';
import Avatar from '../Avatar';
import Button from '../Button';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { Position, UserDto } from '@shared/models';
import { useUser } from '../../../contexts/UserContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { profile } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen, dropdownRef]);

  const DropdownMenu = ({
    isDropdownOpen,
    user,
    logout,
  }: {
    isDropdownOpen: boolean;
    user: UserDto;
    logout: () => void;
  }) => {
    if (!isDropdownOpen || !user) return null;

    return (
      <div
        ref={dropdownRef}
        className="absolute right-0 top-full mt-2 py-3 w-48 bg-theme-card-bg rounded-lg shadow-md z-50 transition-all duration-200 ease-in-out"
        style={{
          opacity: isDropdownOpen ? 1 : 0,
          transform: `scale(${isDropdownOpen ? 1 : 0.95})`,
        }}
      >
        <Link
          onClick={toggleDropdown}
          to="/user/profile"
          className="flex items-center gap-2 px-4 py-2 text-sm text-theme-text hover:bg-theme-accent hover:text-white transition-colors duration-150"
        >
          <FiUser className="text-lg" /> Profile
        </Link>
        <Link
          onClick={toggleDropdown}
          to="/user/settings"
          className="flex items-center gap-2 px-4 py-2 text-sm text-theme-text hover:bg-theme-accent hover:text-white transition-colors duration-150"
        >
          <FiSettings className="text-lg" /> User Settings
        </Link>
        <Button
          onClick={logout}
          label="Logout"
          icon={<FiLogOut className="text-lg" />}
          iconPosition={Position.LEFT}
          className="flex justify-start items-center gap-2 w-full text-left px-4 py-2 text-sm text-theme-text hover:bg-theme-accent hover:text-white transition-colors duration-150"
        />
      </div>
    );
  };
  const MobileMenu = ({
    isOpen,
    closeMenu,
  }: {
    isOpen: boolean;
    closeMenu: () => void;
  }) => {
    if (!isOpen) return null;

    return (
      <div
        className={`xl:hidden fixed inset-x-0 top-0 bg-theme-bg shadow-lg z-50 transition-transform duration-500 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        {/* Close button for mobile menu */}
        <div className="flex justify-end p-4">
          <Button
            onClick={closeMenu}
            icon={<VscChromeClose size={24} />}
            className="text-theme-text hover:bg-theme-accent hover:text-white"
          />
        </div>

        {/* Mobile menu links with items full width but centered */}
        <nav className="flex flex-col items-center text-lg text-theme-text">
          <Link
            to="/dashboard"
            className="flex items-center justify-center py-3 w-full hover:bg-theme-accent hover:text-white transition-colors duration-150 text-center"
            onClick={closeMenu}
          >
            <VscDashboard className="mr-2" /> Dashboard
          </Link>
          <Link
            to="/bookmarks"
            className="flex items-center justify-center py-3 w-full hover:bg-theme-accent hover:text-white transition-colors duration-150 text-center"
            onClick={closeMenu}
          >
            <VscBookmark className="mr-2" /> Bookmarks
          </Link>
          <Link
            to="/categories"
            className="flex items-center justify-center py-3 w-full hover:bg-theme-accent hover:text-white transition-colors duration-150 text-center"
            onClick={closeMenu}
          >
            <MdOutlineCategory className="mr-2" /> Categories
          </Link>
          <Link
            to="/tags"
            className="flex items-center justify-center py-3 w-full hover:bg-theme-accent hover:text-white transition-colors duration-150 text-center"
            onClick={closeMenu}
          >
            <VscTag className="mr-2" /> Tags
          </Link>
          <Link
            to="/settings"
            className="flex items-center justify-center py-3 w-full hover:bg-theme-accent hover:text-white transition-colors duration-150 text-center"
            onClick={closeMenu}
          >
            <VscSettings className="mr-2" /> Settings
          </Link>
          {user && (
            <button
              onClick={logout}
              className="flex items-center justify-center py-3 w-full hover:bg-theme-accent hover:text-white transition-colors duration-150 text-center"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          )}
        </nav>
      </div>
    );
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-theme-bg shadow-md text-theme-text">
      <Link to="/">
        <img className="h-12 text-theme-accent" src={Logo} alt="LOGO" />
      </Link>

      {/* Mobile menu toggle button */}
      <div className="xl:hidden z-30">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <VscChromeClose size={24} />
          ) : (
            <VscMenu size={24} />
          )}
        </button>
      </div>

      {/* Desktop menu icons */}
      <div className="hidden xl:flex w-full items-center justify-end gap-6">
        <Link
          to="/dashboard"
          className="text-theme-accent hover:text-theme-accent-hover"
        >
          <VscDashboard size={24} />
        </Link>
        <Link
          to="/bookmarks"
          className="text-theme-accent hover:text-theme-accent-hover"
        >
          <VscBookmark size={24} />
        </Link>
        <Link
          to="/categories"
          className="text-theme-accent hover:text-theme-accent-hover"
        >
          <MdOutlineCategory size={24} />
        </Link>
        <Link
          to="/tags"
          className="text-theme-accent hover:text-theme-accent-hover"
        >
          <VscTag size={24} />
        </Link>
        <Link
          to="/settings"
          className="text-theme-accent hover:text-theme-accent-hover"
        >
          <VscSettings size={24} />
        </Link>

        {user && (
          <span className="hidden xl:block text-theme-text mx-6">
            {user.username}
          </span>
        )}
      </div>

      {/* Dropdown menu for user settings */}

      <div className="relative">
        <Avatar
          src={profile?.avatar || AvatarImage}
          size="sm"
          base64={!!profile?.avatar}
          alt="User avatar"
          onClick={toggleDropdown}
        />

        <DropdownMenu
          isDropdownOpen={isDropdownOpen}
          user={user as UserDto}
          logout={logout}
        />
      </div>
      {/* Mobile menu content */}
      <MobileMenu isOpen={isMobileMenuOpen} closeMenu={closeMobileMenu} />
    </nav>
  );
};

export default Header;
