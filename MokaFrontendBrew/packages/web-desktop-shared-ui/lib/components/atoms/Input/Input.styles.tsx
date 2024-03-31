export const inputStyles = {
  base: "block w-full px-4 py-2 text-base transition-all duration-300 ease-in-out shadow-sm focus:outline-none",
  props: {
    variant: {
      classic:
        "border-2 border-gray-300 rounded-md hover:border-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:ring-opacity-50",
      underline:
        "border-0 border-b-2 border-gray-300 hover:border-gray-400 focus:border-b-2 focus:border-black",
      floating:
        "border-0 border-b-2 border-gray-300 bg-transparent pt-4 hover:border-gray-400 focus:border-b-2 focus:border-black",
      borderless: "border-none hover:bg-gray-100 focus:bg-gray-200",
      pill: "border-2 border-gray-300 rounded-full hover:border-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:ring-opacity-50",
      neumorphic:
        "bg-gray-100 rounded-lg shadow focus:shadow-md focus:border-gray-400",
    },
    state: {
      default: "",
      success:
        "border-green-500 focus:border-green-600 focus:ring-1 focus:ring-green-500",
      error:
        "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-5 py-2.5 text-lg",
    },
    icon: {
      size: "w-5 h-5",
      color: {
        default: "text-black", // Primary icon color changed to black
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
