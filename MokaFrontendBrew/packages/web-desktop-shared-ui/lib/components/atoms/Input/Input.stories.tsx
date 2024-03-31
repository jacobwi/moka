import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import { Input, InputProps, inputStyles } from "./Input";
import {
  extractDynamicPropOptions,
  generateDynamicArgTypes,
} from "@moka/ui-utils";

// Extract dynamic prop options based on inputStyles
const propOptions = extractDynamicPropOptions(inputStyles);
const dynamicArgTypes = generateDynamicArgTypes(propOptions);

const meta: Meta<typeof Input> = {
  title: "Atomic/Input",
  component: Input,
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
      description: "Enter the react-icons icon name",
      table: {
        category: "Icon",
      },
    },
    iconPosition: {
      control: { type: "inline-radio" },
      options: ["left", "right"],
      description: "Position of the icon relative to the input field",
      table: {
        category: "Icon",
      },
    },
  },
};

export default meta;

// Define stories for various input states
export const Default: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    placeholder: "Default Input",
  },
};

export const Success: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    state: "success",
    placeholder: "Success State",
  },
};

export const Error: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    state: "error",
    placeholder: "Error State",
  },
};

export const WithIcon: StoryObj<typeof Input> = {
  args: {
    placeholder: "Input with Icon",
    iconName: "FaSearch", // Example icon name
    iconPosition: "left", // Icon position
  },
};
