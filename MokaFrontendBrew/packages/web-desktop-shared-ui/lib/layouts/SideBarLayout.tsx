import React, { ReactNode } from 'react';
import { Sidebar } from '../components/organisms/Sidebar/Sidebar';
import { IconType } from 'react-icons'; // Ensure correct type is used
import { SidebarItemVariant } from '../components/organisms/Sidebar/Sidebar.styles';

interface SidebarItemProps {
    icon: IconType; // Using IconType for consistency with Sidebar component
    label: string;
    onClick?: () => void;
    variant?: SidebarItemVariant; // Include if you use variants in your SidebarItem component
}

interface SideBarLayoutProps {
    header?: ReactNode;
    children: ReactNode;
    sidebarItems: SidebarItemProps[]; // Define the items for the Sidebar using SidebarItemProps
}

const SideBarLayout: React.FC<SideBarLayoutProps> = ({ header, children, sidebarItems }) => {


    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar items={sidebarItems} />

            {/* Top bar + Main content */}
            <div className="flex flex-col flex-grow">
                {/* Optional header */}
                {header && (
                    <header className="bg-gray-800 text-white p-4">{header}</header>
                )}

                {/* Main content */}
                <main className="flex-grow overflow-auto p-4">{children}</main>
            </div>
        </div>
    );
};

export default SideBarLayout;
