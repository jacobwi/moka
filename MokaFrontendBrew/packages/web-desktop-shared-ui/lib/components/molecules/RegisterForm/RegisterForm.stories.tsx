import { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";
import { fn } from "@storybook/test";

const meta: Meta<typeof RegisterForm> = {
  title: "Molecules/RegisterForm",
  component: RegisterForm,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    onSubmit: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof RegisterForm> = {
  render: (args) => <RegisterForm {...args} />,
  args: {},
};

export const WithError: StoryObj<typeof RegisterForm> = {
  render: (args) => <RegisterForm {...args} />,
  args: {
    error: "An error occurred, please try again.",
  },
};
