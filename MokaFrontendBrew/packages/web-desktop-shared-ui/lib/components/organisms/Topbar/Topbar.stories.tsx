import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Topbar, TopbarProps } from "./Topbar";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";

export default {
  title: "Organisms/Topbar",
  component: Topbar,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Topbar>;

const Template: StoryObj<TopbarProps> = {
  args: {
    items: [
      {
        icon: FiHome,
        label: "Home",
        onClick: () => console.log("Home clicked"),
      },
      {
        icon: FiSettings,
        label: "Settings",
        onClick: () => console.log("Settings clicked"),
      },
      {
        icon: FiUser,
        label: "Profile",
        onClick: () => console.log("Profile clicked"),
      },
    ],
    showAvatar: true,
    avatarUrl: "https://via.placeholder.com/150",
    avatarLabel: "John Doe",
    onAvatarClick: () => console.log("Avatar clicked"),
  },
};

export const Default = { ...Template };

export const WithCustomHeader = {
  ...Template,
  args: {
    ...Template.args,
    header: <div style={{ color: "limegreen" }}>Custom Header</div>,
  },
};

export const WithoutAvatar = {
  ...Template,
  args: {
    ...Template.args,
    showAvatar: false,
  },
};
