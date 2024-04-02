import React from 'react';
import { SidebarItemVariant, sidebarStyles } from './Sidebar.styles';
import SidebarItem from '../../molecules/SidebarItem/SidebarItem';
import { IconType } from 'react-icons';

interface SidebarProps {
    items: Array<{
        icon: IconType;
        label: string;
        variant?: SidebarItemVariant;
        onClick: () => void;
    }>;
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
    return (
        <aside className={sidebarStyles.base}>
            {items.map((item, index) => (
                <SidebarItem key={index} {...item} />
            ))}
        </aside>
    );
};

export default Sidebar;
