import { Meta, StoryObj } from '@storybook/react';
import SidebarLayout from './SideBarLayout'; // Adjust the import path as necessary
import { FiHome, FiSettings, FiUser } from 'react-icons/fi';
import { SidebarItemVariant } from '../components/organisms/Sidebar/Sidebar.styles'; // Adjust import path as necessary

export default {
    title: 'Layouts/SidebarLayout',
    component: SidebarLayout,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta<typeof SidebarLayout>;

const sidebarItems = [
    {
        icon: FiHome,
        label: 'Home',
        variant: 'default' as SidebarItemVariant,
        onClick: () => console.log('Home clicked'),
    },
    {
        icon: FiSettings,
        label: 'Settings',
        variant: 'active' as SidebarItemVariant,
        onClick: () => console.log('Settings clicked'),
    },
    {
        icon: FiUser,
        label: 'Profile',
        variant: 'inactive' as SidebarItemVariant,
        onClick: () => console.log('Profile clicked'),
    },
];

export const Default: StoryObj<typeof SidebarLayout> = {
    args: {
        sidebarItems: sidebarItems, // Passing the sidebar items directly to the SidebarLayout component
        children: (
            <div className="p-4">
                <h1 className="text-xl font-semibold">Main Content</h1>
                <p>This area represents the main content section next to the sidebar.</p>
            </div>
        ),
    },
};
