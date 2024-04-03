/**
 * Applies variant properties to a base object using a variants configuration.
 * @param baseObject - The base object to apply variants to.
 * @param variantsConfig - The configuration object that maps variant properties to functions.
 * @param variantProps - The partial object containing the variant properties and their values.
 * @returns The base object with the variant properties applied.
 */
export function av(baseObject, variantsConfig, variantProps) {
  return Object.entries(variantProps).reduce(function (result, _a) {
    var _b;
    var prop = _a[0],
      value = _a[1];
    // Ensure the value is converted to a string to match the key in variantsConfig
    var variantValue = String(value);
    var variantFunction =
      (_b = variantsConfig[prop]) === null || _b === void 0
        ? void 0
        : _b[variantValue];
    // Check if variantFunction is indeed a function before invoking it
    if (typeof variantFunction === "function") {
      return variantFunction(result);
    } else {
      console.warn(
        'Variant function for prop "'
          .concat(prop, '" with value "')
          .concat(variantValue, '" not found.'),
      );
      return result;
    }
  }, baseObject);
}
