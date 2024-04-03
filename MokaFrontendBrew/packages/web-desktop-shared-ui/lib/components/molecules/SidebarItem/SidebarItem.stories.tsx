import { Meta, StoryObj } from '@storybook/react';
import { FiHome } from 'react-icons/fi';
import SidebarItem, { SidebarItemProps } from './SidebarItem';
import { fn } from '@storybook/test';

export default {
    title: 'Molecules/SidebarItem',
    component: SidebarItem,
    args: { onClick: fn() },
} as Meta<typeof SidebarItem>;

export const Default: StoryObj<SidebarItemProps> = {
    args: {
        icon: FiHome,
        label: 'Home',
        onClick: () => alert('Home clicked'),
    },
};
