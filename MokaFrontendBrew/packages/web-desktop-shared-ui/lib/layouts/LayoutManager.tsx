import React, { ReactNode, isValidElement } from 'react';

type LayoutType = 'topbar' | 'sidebar' | 'custom';

interface LayoutManagerProps {
    layout: LayoutType;
    customLayout?: ReactNode; // For entirely custom layouts
    customHeader?: ReactNode; // For customizing the header within standard layouts
    children: ReactNode;
}

const TopBarLayout: React.FC<{ header?: ReactNode }> = ({ header, children }) => (
    <div className="topbar-layout">
        <header>{isValidElement(header) ? header : <DefaultHeader />}</header>
        <main>{children}</main>
    </div>
);

const SideBarLayout: React.FC<{ header?: ReactNode }> = ({ header, children }) => (
    <div className="sidebar-layout">
        <aside>Sidebar</aside>
        <main>
            {isValidElement(header) ? header : <DefaultHeader />}
            {children}
        </main>
    </div>
);

const DefaultHeader: React.FC = () => <div>Default Header</div>;

const LayoutManager: React.FC<LayoutManagerProps> = ({ layout, customLayout, customHeader, children }) => {
    // Handle custom layout
    if (layout === 'custom' && isValidElement(customLayout)) {
        return <>{customLayout}</>;
    }

    // Handle predefined layouts with possible custom headers
    switch (layout) {
        case 'topbar':
            return <TopBarLayout header={customHeader}>{children}</TopBarLayout>;
        case 'sidebar':
            return <SideBarLayout header={customHeader}>{children}</SideBarLayout>;
        default:
            // Fallback for unrecognized layout types or missing custom layout
            console.warn(`LayoutManager: Unrecognized layout type '${layout}' or missing 'customLayout' prop.`);
            return <>{children}</>; // Render children without a layout wrapper as a safe fallback
    }
};

export default LayoutManager;
