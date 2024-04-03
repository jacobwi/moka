import React, { ReactNode } from 'react';
import { Topbar, TopbarProps } from '../components/organisms/Topbar/Topbar'; // Adjust the import path as necessary

interface TopBarLayoutProps {
    topbarProps?: TopbarProps; // Props for the Topbar component
    children: ReactNode; // Main content
}

const TopBarLayout: React.FC<TopBarLayoutProps> = ({ topbarProps, children }) => (
    <div className="flex flex-col min-h-screen">
        {/* Integrated Topbar component */}
        {topbarProps?.items && topbarProps.items.length > 0 && (
            <Topbar {...topbarProps} items={topbarProps.items} />
        ) || <div className='conatiner mx-auto text-center p-4 bg-gray-700 w-full'>Topbar</div>}
        <main className="flex-grow overflow-auto p-4 bg-gray-100">
            {children}
        </main>
    </div>
);

export default TopBarLayout;
