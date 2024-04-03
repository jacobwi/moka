import React from 'react';
import { SidebarItemVariant, sidebarStyles } from './Sidebar.styles';
import SidebarItem from '../../molecules/SidebarItem/SidebarItem';
import { IconType } from 'react-icons';

interface SidebarProps {
    items: Array<{
        icon: IconType;
        label: string;
        variant?: SidebarItemVariant;
        onClick?: () => void;
    }>;
    showAvatar?: boolean; // Optional boolean to show/hide the avatar section
    avatarUrl?: string; // URL for the avatar image
    avatarLabel?: string; // Label for the avatar, could be the user's name
    onAvatarClick?: () => void; // Function to execute when the avatar is clicked
}

const Sidebar: React.FC<SidebarProps> = ({ items, showAvatar = false, avatarUrl, avatarLabel, onAvatarClick }) => {
    return (
        <aside className={sidebarStyles.base}>
            {showAvatar && avatarUrl && (
                <div className="w-full flex flex-col items-center mb-8">
                    <button onClick={onAvatarClick} className="mb-2">
                        <img src={avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                    </button>
                    {avatarLabel && <span className="text-sm font-medium text-gray-700">{avatarLabel}</span>}
                </div>
            )}
            {items.map((item, index) => (
                <SidebarItem key={index} {...item} />
            ))}
        </aside>
    );
};

export { Sidebar, type SidebarProps };
