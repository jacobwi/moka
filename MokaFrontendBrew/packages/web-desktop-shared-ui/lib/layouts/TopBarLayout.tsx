import React, { ReactNode } from 'react';

interface TopBarLayoutProps {
    header?: ReactNode;
    children: ReactNode;
}

const TopBarLayout: React.FC<TopBarLayoutProps> = ({ header, children }) => (
    <div className="flex flex-col h-screen">
        <header className="bg-gray-800 text-white p-4 text-center">{header}</header>
        <main className="flex-grow overflow-auto p-4">{children}</main>
    </div>
);

export default TopBarLayout;
