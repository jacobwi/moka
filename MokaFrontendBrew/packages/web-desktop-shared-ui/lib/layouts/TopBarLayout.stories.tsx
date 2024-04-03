import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TopBarLayout from "./TopBarLayout";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";
import { TopbarProps } from "../components/organisms/Topbar/Topbar"; // Adjust the import path as necessary
export default {
  title: "Layouts/TopBarLayout",
  component: TopBarLayout,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof TopBarLayout>;

// Example TopbarProps to demonstrate integration with TopBarLayout
const topbarProps: TopbarProps = {
  items: [
    { icon: FiHome, label: "Home", onClick: () => console.log("Home clicked") },
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
};

export const Default: StoryObj<typeof TopBarLayout> = {
  args: {
    topbarProps, // Passing the example TopbarProps
    children: (
      <div>
        <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
        <p>
          This is the main content area below the top bar. Add more content or
          components here.
        </p>
      </div>
    ),
  },
};

export const WithoutAvatar: StoryObj<typeof TopBarLayout> = {
  args: {
    topbarProps: {
      ...topbarProps,
      showAvatar: false, // Hide the avatar for this story
    },
    children: (
      <div>
        <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
        <p>
          This variant of the layout does not include an avatar in the top bar.
        </p>
      </div>
    ),
  },
};
