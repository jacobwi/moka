/**
 * Creates a class object with variant classes based on the provided base classes and variant configurations.
 * @param baseClasses - The base classes to start with.
 * @param variants - The variant configurations for each class property.
 * @param defaultVariants - The default variant configurations for each class property.
 * @returns A function that takes variant properties and returns a string of combined classes.
 */
export function co(baseClasses, _a) {
  var variants = _a.variants,
    defaultVariants = _a.defaultVariants;
  return function (variantProps) {
    var combinedClasses = [baseClasses]; // Start with the base classes
    Object.keys(variants).forEach(function (key) {
      var _a, _b;
      var propKey = key;
      var propValue = variantProps[propKey];
      var variantClass = propValue
        ? (_a = variants[propKey]) === null || _a === void 0
          ? void 0
          : _a[String(propValue)]
        : (_b = variants[propKey]) === null || _b === void 0
          ? void 0
          : _b[defaultVariants[propKey]];
      if (variantClass) {
        combinedClasses.push(variantClass); // If a class is found, add it to the list
      }
    });
    return combinedClasses.join(" "); // Combine all classes into a single string
  };
}
