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
export function av<T>(
  baseObject: T,
  variantsConfig: VariantsConfig<T>,
  variantProps: Partial<T>
): T {
  return Object.entries(variantProps).reduce<T>((result, [prop, value]) => {
    // Ensure the value is converted to a string to match the key in variantsConfig
    const variantValue = String(value);
    const variantFunction = variantsConfig[prop as keyof T]?.[variantValue];

    // Check if variantFunction is indeed a function before invoking it
    if (typeof variantFunction === 'function') {
      return variantFunction(result);
    } else {
      console.warn(`Variant function for prop "${prop}" with value "${variantValue}" not found.`);
      return result;
    }
  }, baseObject);
}
