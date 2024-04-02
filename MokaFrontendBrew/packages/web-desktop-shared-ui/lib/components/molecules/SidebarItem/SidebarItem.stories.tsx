import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FiHome } from 'react-icons/fi';
import SidebarItem from './SidebarItem';
import { SidebarItemProps } from './SidebarItem';

export default {
    title: 'Molecules/SidebarItem',
    component: SidebarItem,
} as Meta<typeof SidebarItem>;

export const Default: StoryObj<SidebarItemProps> = {
    args: {
        icon: FiHome,
        label: 'Home',
        onClick: () => alert('Home clicked'),
    },
};
