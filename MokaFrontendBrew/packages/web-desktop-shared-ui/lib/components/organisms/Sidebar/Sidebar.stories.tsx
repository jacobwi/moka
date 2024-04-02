import React from 'react';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FiHome, FiSettings, FiLogOut } from 'react-icons/fi';
import Sidebar from './Sidebar';
import { SidebarItemVariant } from './Sidebar.styles';

interface SidebarStoryProps {
    items: Array<{
        icon: React.ElementType;
        label: string;
        variant?: SidebarItemVariant;
        onClick: () => void;
    }>;
}

const argTypes: ArgTypes = {
    items: {
        control: 'object',
        description: 'Array of sidebar items',
        table: {
            type: {
                summary: 'Array<Item>',
                detail: `Item: {
                    icon: React.ElementType;
                    label: string;
                    variant?: SidebarItemVariant;
                    onClick: () => void;
                }`,
            },
        },
    },
};

export default {
    title: 'Organisms/Sidebar',
    component: Sidebar,
    argTypes,
} as Meta<typeof Sidebar>;

export const Default: StoryObj<SidebarStoryProps> = {
    args: {
        items: [
            {
                icon: FiHome,
                label: 'Home',
                variant: 'default',
                onClick: () => alert('Home clicked'),
            },
            {
                icon: FiSettings,
                label: 'Settings',
                variant: 'active',
                onClick: () => alert('Settings clicked'),
            },
            {
                icon: FiLogOut,
                label: 'Logout',
                onClick: () => alert('Logout clicked'),
            },
        ],
    },
};