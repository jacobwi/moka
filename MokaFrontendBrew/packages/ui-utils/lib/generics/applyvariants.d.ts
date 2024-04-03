type VariantsConfig<T> = {
  [Property in keyof T]?: {
    [VariantValue: string]: (baseProps: T) => T;
  };
};
/**
 * Applies variant properties to a base object using a variants configuration.
 * @param baseObject - The base object to apply variants to.
 * @param variantsConfig - The configuration object that maps variant properties to functions.
 * @param variantProps - The partial object containing the variant properties and their values.
 * @returns The base object with the variant properties applied.
 */
export declare function av<T>(
  baseObject: T,
  variantsConfig: VariantsConfig<T>,
  variantProps: Partial<T>,
): T;
export {};
//# sourceMappingURL=applyvariants.d.ts.map
