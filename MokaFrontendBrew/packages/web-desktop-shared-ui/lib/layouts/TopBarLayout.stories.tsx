import React from 'react';
import { Meta, Story } from '@storybook/react';
import TopBarLayout from './TopBarLayout';

export default {
    title: 'Layouts/TopBarLayout',
    component: TopBarLayout,
} as Meta;

const Template: Story = (args) => <TopBarLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
    header: <div>TopBar Content</div>,
    children: <div>Main Content</div>,
};
