import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps, buttonStyles } from "./Button";
import {
  extractDynamicPropOptions,
  generateDynamicArgTypes,
} from "@moka/ui-utils";
const propOptions = extractDynamicPropOptions(buttonStyles);
const dynamicArgTypes = generateDynamicArgTypes(propOptions);

const meta: Meta<typeof Button> = {
  title: "Atomic/Button",
  component: Button,

  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    ...dynamicArgTypes,
    iconName: {
      control: "text",
      description: "Enter the react-icons icon name (from the Fa library)",
      table: {
        category: "Icon", // Ensure the category is set explicitly
      },
    },
    iconPosition: {
      control: { type: "inline-radio" },
      options: ["left", "right"],
      description: "Position of the icon relative to the button text",
      table: {
        category: "Icon", // Ensure the category is set explicitly
      },
    },
  },
};

export default meta;

export const AllButtons: StoryObj<typeof Button> = {
  render: (args) => (
    <div className="flex flex-col items-center space-y-4">
      {/* Render each button variant */}
      <Button variant="primary" size="md" {...args}>
        Primary Button
      </Button>
      <Button variant="secondary" size="md" {...args}>
        Secondary Button
      </Button>
      {/* Ensure you have an appropriate icon component or logic to handle the iconName prop */}
      <Button iconName="FaReact" {...args}>
        Button with Icon
      </Button>
    </div>
  ),
};

export const Primary: StoryObj<typeof Button> = {
  render: (args) => <Button {...args}>Primary Button</Button>,
  args: {
    variant: "primary",
    size: "md",
  },
};

export const Secondary: StoryObj<typeof Button> = {
  render: (args) => <Button {...args}>Secondary Button</Button>,
  args: {
    variant: "secondary",
    size: "md",
  },
};

export const Success: StoryObj<typeof Button> = {
  render: (args) => <Button {...args}>Success Button</Button>,
  args: {
    variant: "success",
    size: "md",
  },
};

export const Danger: StoryObj<typeof Button> = {
  render: (args) => <Button {...args}>Danger Button</Button>,
  args: {
    variant: "danger",
    size: "md",
  },
};

export const Info: StoryObj<typeof Button> = {
  render: (args) => <Button {...args}>Info Button</Button>,
  args: {
    variant: "info",
    size: "md",
  },
};

export const Warning: StoryObj<typeof Button> = {
  render: (args) => <Button {...args}>Warning Button</Button>,
  args: {
    variant: "warning",
    size: "md",
  },
};

export const Light: StoryObj<typeof Button> = {
  render: (args) => <Button {...args}>Light Button</Button>,
  args: {
    variant: "light",
    size: "md",
  },
};

export const WithIcon: StoryObj<typeof Button> = {
  args: {
    children: "Button with Icon",
    iconName: "FaReact",
  },
  argTypes: {
    iconName: {
      control: "text",
      description: "Enter the react-icons icon name (from the Fa library)",
    },
  },
};
