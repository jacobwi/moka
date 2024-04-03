import React from 'react';
import { IconType } from "react-icons";
import { TopbarItemVariant, topbarStyles } from "./Topbar.styles";
import TopbarItem from "../../molecules/TopbarItem/TopbarItem";

interface TopbarProps {
    items: Array<{
        icon: IconType;
        label: string;
        variant?: TopbarItemVariant;
        onClick?: () => void;
    }>;
    showAvatar?: boolean;
    avatarUrl?: string;
    avatarLabel?: string;
    onAvatarClick?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ items, showAvatar = false, avatarUrl, avatarLabel, onAvatarClick }) => (
    <aside className={topbarStyles.base}>
        {showAvatar && avatarUrl && (
            <div className="flex items-center justify-center w-full">
                <button onClick={onAvatarClick} >
                    <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                </button>
                {avatarLabel && <span className="ml-2 text-sm font-medium text-gray-700">{avatarLabel}</span>}
            </div>
        )}
        {items.map((item, index) => (
            <TopbarItem key={index} {...item} />
        ))}
    </aside>
);

export { Topbar, type TopbarProps };
