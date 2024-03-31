type ClassVariantsConfig<T> = {
  [Property in keyof T]?: {
    [VariantValue: string]: string; // Directly using string for class names
  };
};

type DefaultClassVariants<T> = {
  [Property in keyof T]?: string;
};

/**
 * Creates a class object with variant classes based on the provided base classes and variant configurations.
 * @param baseClasses - The base classes to start with.
 * @param variants - The variant configurations for each class property.
 * @param defaultVariants - The default variant configurations for each class property.
 * @returns A function that takes variant properties and returns a string of combined classes.
 */
export function co<T>(
  baseClasses: string,
  {
    variants,
    defaultVariants,
  }: { variants: ClassVariantsConfig<T>; defaultVariants: DefaultClassVariants<T> }
) {
  return (variantProps: Partial<T>): string => {
    const combinedClasses = [baseClasses]; // Start with the base classes

    Object.keys(variants).forEach((key) => {
      const propKey = key as keyof T;
      const propValue = variantProps[propKey];
      const variantClass = propValue
        ? variants[propKey]?.[String(propValue)]
        : variants[propKey]?.[defaultVariants[propKey] as string];

      if (variantClass) {
        combinedClasses.push(variantClass); // If a class is found, add it to the list
      }
    });

    return combinedClasses.join(' '); // Combine all classes into a single string
  };
}
