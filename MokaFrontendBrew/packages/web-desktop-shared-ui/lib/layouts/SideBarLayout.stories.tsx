import React from 'react';
import { Meta, Story } from '@storybook/react';
import SideBarLayout from './SideBarLayout';

export default {
    title: 'Layouts/SideBarLayout',
    component: SideBarLayout,
} as Meta;

const Template: Story = (args) => <SideBarLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
    header: <div>Sidebar Content</div>,
    children: <div>Main Content</div>,
};
