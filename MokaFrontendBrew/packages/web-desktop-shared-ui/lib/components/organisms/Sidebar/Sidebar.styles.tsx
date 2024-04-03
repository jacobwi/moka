export const sidebarStyles = {
  base: "w-20 md:w-64 h-screen text-gray-900 flex flex-col items-center py-5 bg-gradient-to-b from-gray-50 to-gray-100",
  item: {
    base: "w-full p-2 flex items-center justify-center md:justify-start cursor-pointer transition duration-300 ease-in-out transform hover:scale-105",
    icon: "text-2xl", // Larger icons for a modern look
    text: "hidden md:block ml-4 text-base font-light tracking-wide", // Lighter, wider text for elegance
    border: "border-b border-transparent hover:border-gray-300", // Only show border on hover for a cleaner look
    variants: {
      default: "text-gray-600 hover:text-gray-800",
      active: `bg-gradient-to-l from-blue-400 to-blue-500 shadow-lg rounded-md`, // Use a gradient that suits your preference
      inactive: "hover:text-gray-800",
      highlighted: "text-gray-800 hover:bg-gray-200 rounded-lg", // Rounded corners for a softer look
      disabled: "text-gray-400 cursor-not-allowed opacity-50",
    },
  },
};

export type SidebarItemVariant = keyof typeof sidebarStyles.item.variants;
