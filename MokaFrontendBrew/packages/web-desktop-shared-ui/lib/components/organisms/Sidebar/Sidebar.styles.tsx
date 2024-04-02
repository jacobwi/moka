export const sidebarStyles = {
    base: "w-64 h-full bg-gray-800 text-white flex flex-col",
    item: {
        base: "text-gray-300 hover:bg-gray-700 p-2 flex items-center cursor-pointer transition-colors duration-150 ease-in-out",
        variants: {
            default: "",
            active: "bg-gray-700 text-white",
            inactive: "text-gray-400 hover:text-white",
            highlighted: "bg-blue-500 hover:bg-blue-600 text-white",
            disabled: "text-gray-500 cursor-not-allowed",
        },
    },
};

export type SidebarItemVariant = keyof typeof sidebarStyles.item.variants;
