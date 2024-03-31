type ClassVariantsConfig<T> = {
    [Property in keyof T]?: {
        [VariantValue: string]: string;
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
export declare function co<T>(baseClasses: string, { variants, defaultVariants, }: {
    variants: ClassVariantsConfig<T>;
    defaultVariants: DefaultClassVariants<T>;
}): (variantProps: Partial<T>) => string;
export {};
//# sourceMappingURL=createObject.d.ts.map