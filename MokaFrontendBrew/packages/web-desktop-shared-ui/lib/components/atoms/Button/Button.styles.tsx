export const buttonStyles = {
  base: 'inline-flex items-center px-4 py-2 border font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
  props: {
    variant: {
      primary:
        'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent focus:ring-indigo-500',
      secondary:
        'text-indigo-600 bg-white hover:bg-indigo-50 border-indigo-600 focus:ring-indigo-500',
      success:
        'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent focus:ring-emerald-500',
      danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    hover: {
      light: 'hover:bg-indigo-50',
      elevate: 'hover:shadow-lg',
    },
    focus: {
      strong: 'focus:ring-4',
      offset: 'focus:ring-offset-4',
    },
    icon: {
      default: 'w-5 h-5', // Width and height for the icon
      color: {
        primary: 'text-red-400', // Color for primary variant
        secondary: 'text-yellow-600', // Color for secondary variant
      },
      // Define margin variations or other styles if needed
      margin: {
        left: 'mr-2', // Margin right when icon is on the left
        right: 'ml-2', // Margin left when icon is on the right
      },
    },
  },
};
