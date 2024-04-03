export const topbarStyles = {
    base: "w-full h-12 flex items-center justify-end px-4 bg-white border-b border-gray-200",
    item: {
        base: "flex items-center justify-start cursor-pointer transition duration-150 ease-in-out hover:bg-gray-100 px-2 py-1 rounded-full",
        icon: "text-lg text-gray-600", // Adjust icon size and color for a sleek look
        text: "ml-2 text-sm font-medium text-gray-800 hidden md:block", // Hide text on smaller screens for a cleaner look
        variants: {
            default: "",
            active: "bg-gray-100 text-blue-500", // Highlight the active item subtly
            inactive: "text-gray-600",
            highlighted: "text-gray-800 bg-gray-100", // Subtle highlight for important items
            disabled: "text-gray-400 cursor-not-allowed opacity-50",
        },
    },
};

export type TopbarItemVariant = keyof typeof topbarStyles.item.variants;
