export const inputStyles = {
  base: 'block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
  props: {
    // Type for text, password, email, number, etc.
    type: {
      text: '', // Default 'text' type generally needs no extra styling
      password: '',
      email: '',
    },
    // Size variations
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2',
      lg: 'px-4 py-3 text-lg',
    },
    // Visual state variations
    state: {
      default: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
      success: 'border-emerald-500 focus:ring-emerald-500 focus:border-emerald-500',
      error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
    },
    // Rounded variations
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    // Disabled Styles
    disabled: {
      'opacity-50 cursor-not-allowed bg-gray-100': true,
    },
    // Icon integration
    icon: {
      // Size variations (adjust values if needed)
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      // Color variations
      primary: 'text-indigo-500',
      error: 'text-red-500',
      // Position variations
      left: 'mr-2',
      right: 'ml-2',
    },
  },
};
