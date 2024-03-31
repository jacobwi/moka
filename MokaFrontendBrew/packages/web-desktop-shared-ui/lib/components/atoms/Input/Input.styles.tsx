export const inputStyles = {
  base: "block w-full px-4 py-3 text-base font-medium transition-colors duration-300 ease-in-out shadow-sm focus:outline-none ring-1 ring-gray-200 focus:ring-2",
  props: {
    variant: {
      classic: "border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500",
      underline: "border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500",
      floating: "border-0 border-b-2 border-gray-300 bg-transparent focus:border-blue-500 focus:ring-blue-500",
      borderless: "border-none rounded-md focus:bg-gray-50",
      pill: "border rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500",
      neumorphic: "bg-gray-50 rounded-lg shadow-sm focus:shadow-md focus:border-gray-400",
    },
    state: {
      default: "",
      success: "border-green-500 focus:border-green-600 focus:ring-green-500",
      error: "border-red-500 focus:border-red-600 focus:ring-red-500 text-red-600 placeholder-red-400",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3",
      lg: "px-5 py-4 text-lg",
    },
    icon: {
      size: "w-5 h-5",
      color: {
        default: "text-gray-700",
        success: "text-green-500",
        error: "text-red-500",
      },
      position: {
        left: "absolute inset-y-0 left-0 flex items-center pl-3",
        right: "absolute inset-y-0 right-0 flex items-center pr-3",
      },
    },
  },
};
