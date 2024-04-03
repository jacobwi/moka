import React from "react";
import { IconType } from "react-icons";
import { SidebarItemVariant, sidebarStyles } from "./Sidebar.styles";
import SidebarItem from "../../molecules/SidebarItem/SidebarItem";

interface SidebarProps {
  items: Array<{
    icon: IconType;
    label: string;
    variant?: SidebarItemVariant;
    onClick?: () => void;
  }>;
  showAvatar?: boolean;
  avatarUrl?: string;
  avatarLabel?: string;
  onAvatarClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  showAvatar,
  avatarUrl,
  avatarLabel,
  onAvatarClick,
}) => {
  return (
    <aside className={sidebarStyles.base}>
      <div
        className={`${showAvatar ? "pt-8" : "pt-4"} flex flex-col items-center w-full`}
      >
        {showAvatar && avatarUrl && (
          <div className="flex flex-col items-center mb-4">
            <button onClick={onAvatarClick} className="mb-2">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
            </button>
            {avatarLabel && (
              <span className="text-sm font-medium text-gray-700">
                {avatarLabel}
              </span>
            )}
          </div>
        )}
        <nav className="w-full">
          {items.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export { Sidebar, type SidebarProps };
