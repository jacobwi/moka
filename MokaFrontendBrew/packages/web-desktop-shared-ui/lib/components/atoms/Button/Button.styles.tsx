export const buttonStyles = {
  base: "bg-blackinline-flex items-center justify-center px-4 py-2 border font-medium text-sm transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm rounded-md",
  props: {
    variant: {
      primary:
        "bg-black text-white hover:bg-gray-900 border-transparent focus:ring-gray-700 hover:shadow-lg hover:shadow-gray-800/50",
      secondary:
        "bg-white/80 text-black hover:bg-white/90 border-gray-300 focus:ring-gray-300 backdrop-blur-sm hover:shadow-lg hover:shadow-gray-300/50",
      success:
        "bg-green-600 text-white hover:bg-green-700 border-transparent focus:ring-green-500 hover:shadow-lg hover:shadow-green-700/50",
      danger:
        "bg-red-600 text-white hover:bg-red-700 border-transparent focus:ring-red-500 hover:shadow-lg hover:shadow-red-700/50",
      info: "bg-blue-600 text-white hover:bg-blue-700 border-transparent focus:ring-blue-500 hover:shadow-lg hover:shadow-blue-700/50",
      warning:
        "bg-yellow-500 text-black hover:bg-yellow-600 border-transparent focus:ring-yellow-400 hover:shadow-lg hover:shadow-yellow-600/50",
      light:
        "bg-gray-100 text-gray-800 hover:bg-gray-200 border-transparent focus:ring-gray-300 hover:shadow-lg hover:shadow-gray-300/50",
    },
    size: {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    hover: {
      light: "hover:bg-gray-50",
      elevate: "hover:-translate-y-1",
    },
    focus: {
      strong: "focus:ring-4",
      offset: "focus:ring-offset-4",
    },
    icon: {
      default: "w-4 h-4",
      color: {
        primary: "text-white",
        secondary: "text-black",
      },
      margin: {
        left: "mr-2",
        right: "ml-2",
      },
    },
  },
};
