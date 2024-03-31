import { Meta, StoryObj } from '@storybook/react';
import { Button, buttonStyles } from './Button';
import { extractDynamicPropOptions, generateDynamicArgTypes } from '@moka/ui-utils';
const propOptions = extractDynamicPropOptions(buttonStyles);
const dynamicArgTypes = generateDynamicArgTypes(propOptions);

const meta: Meta<typeof Button> = {
  title: 'Atomic/Button',
  component: Button,
  tags: ['autodocs'],

  argTypes: {
    ...dynamicArgTypes,
    iconName: {
      control: 'text',
      description: 'Enter the react-icons icon name (from the Fa library)',
      table: {
        category: 'Icon', // Ensure the category is set explicitly
      },
    },
    iconPosition: {
      control: { type: 'inline-radio' },
      options: ['left', 'right'],
      description: 'Position of the icon relative to the button text',
      table: {
        category: 'Icon', // Ensure the category is set explicitly
      },
    },
  },
};

export default meta;
export const Primary: StoryObj<typeof Button> = {
  render: (args) => <Button {...args}>Primary Button</Button>,
  args: {
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: StoryObj<typeof Button> = {
  render: (args) => <Button {...args}>Secondary Button</Button>,
  args: {
    variant: 'secondary',
    size: 'md',
  },
};

export const WithIcon: StoryObj<typeof Button> = {
  args: {
    children: 'Button with Icon',
    iconName: 'FaReact',
  },
  argTypes: {
    iconName: {
      control: 'text',
      description: 'Enter the react-icons icon name (from the Fa library)',
    },
  },
};
