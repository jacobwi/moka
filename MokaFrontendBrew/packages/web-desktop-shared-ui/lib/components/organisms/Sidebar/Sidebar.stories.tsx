import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FiHome, FiSettings, FiLogOut } from 'react-icons/fi';
import { Sidebar, SidebarProps } from './Sidebar';

export default {
    title: 'Organisms/Sidebar',
    component: Sidebar,
    argTypes: {
        showAvatar: {
            control: 'boolean',
            description: 'Show/hide the avatar section',
        },
        avatarUrl: {
            control: 'text',
            description: 'URL for the avatar image',
        },
        avatarLabel: {
            control: 'text',
            description: 'Label for the avatar, could be the user\'s name',
        },
        // Assuming onAvatarClick will be logged via actions
        items: {
            control: 'object',
            description: 'Array of sidebar items',
        },
    },
} as Meta<SidebarProps>;

export const Default: StoryObj<SidebarProps> = {
    parameters: {
        layout: 'fullscreen',
        actions: {
            handles: ['click .sidebar-item'],
        },
    },
    args: {
        showAvatar: true,
        avatarUrl: 'https://via.placeholder.com/150',
        avatarLabel: 'John Doe',
        items: [
            {
                icon: FiHome,
                label: 'Home',
                variant: 'default',
            },
            {
                icon: FiSettings,
                label: 'Settings',
                variant: 'active',
            },
            {
                icon: FiLogOut,
                label: 'Logout',
            },
        ],
    },
    render: (args) => <Sidebar {...args} />,
};
