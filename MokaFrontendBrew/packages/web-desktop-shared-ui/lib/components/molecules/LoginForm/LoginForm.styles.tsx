export const loginFormStyles = {
    base: "flex w-full mx-auto overflow-hidden transition-all duration-300 shadow-lg rounded-xl",
    content: "flex flex-col space-y-6 p-8 bg-white w-full",
    title: "text-3xl font-semibold text-center mb-4",
    logo: "mx-auto",
    errorWrapper: "bg-red-200 flex items-center space-x-2 p-4 rounded-md",
    errorIcon: "text-red-500 text-lg",
    errorMessage: "text-red-500 text-sm flex-1",
    submitButton: "w-full mt-8 py-3 text-white bg-black hover:bg-gray-800 rounded-lg font-medium shadow transition-colors duration-300 ease-in-out",
    rememberMe: "flex items-center mt-4", // Style for the Remember Me checkbox
    forgotPassword: "text-sm text-blue-600 hover:text-blue-800 cursor-pointer mt-4", // Style for the Forgot Password link
    variants: {
        default: "max-w-md",
        compact: "max-w-sm space-y-4 p-4",
        withImage: {
            base: "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden",
            imageSection: "hidden md:block w-full md:w-1/2 bg-cover bg-center bg-no-repeat rounded-l-xl",
            content: "flex-1 rounded-r-xl p-8",
        },
        withLogo: "max-w-md mb-6",

        inline: "flex items-center justify-between max-w-lg p-4 bg-white rounded-lg shadow",
    },
    applyVariant: function (variant, imageUrl) {
        const variantStyles = this.variants[variant] || this.variants.default;

        if (variant === 'withImage' && imageUrl) {
            return {
                base: `${this.base} ${variantStyles.base}`,
                imageSection: `${variantStyles.imageSection} bg-image[url('${imageUrl}')]`,
                content: `${variantStyles.content}`,
            };
        } else if (variant === 'floatingLabels' || typeof variantStyles === 'object') {
            // Handle floatingLabels and any other object-based variants
            return {
                base: `${this.base} ${variantStyles.base || ''}`,
                content: `${this.content} ${variantStyles.content || ''}`,
                ...variantStyles, // Spread any additional styles specific to the variant
            };
        } else {
            // Handle string-based variants
            return `${this.base} ${variantStyles}`;
        }
    }
};
