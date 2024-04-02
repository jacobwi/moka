import React, { ReactNode } from 'react';

interface SideBarLayoutProps {
    header?: ReactNode;
    children: ReactNode;
}

const SideBarLayout: React.FC<SideBarLayoutProps> = ({ header, children }) => (
    <div className="flex h-screen">
        <aside className="w-60 bg-gray-700 text-white p-4">{header}</aside>
        <main className="flex-grow overflow-auto p-4">{children}</main>
    </div>
);

export default SideBarLayout;
