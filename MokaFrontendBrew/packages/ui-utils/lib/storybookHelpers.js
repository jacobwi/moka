/**
 * Metadata for component props.
 */
var propMetadata = {
    variant: {
        description: 'Selects the button style variant.',
        category: 'Appearance',
        defaultValue: 'primary',
    },
    size: {
        description: 'Determines the size of the button.',
        category: 'Appearance',
        defaultValue: 'md',
    },
    iconPosition: {
        control: { type: 'radio' },
        options: ['left', 'right'],
        defaultValue: 'left',
        description: 'Position of the icon relative to the button text',
        table: {
            category: 'Icon',
        },
    },
    icon: {
        description: 'Styles for the icon',
        category: 'Icon',
    },
};
/**
 * Checks if a value is an object.
 * @param value - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
function isObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}
/**
 * Extracts dynamic property options from a styles object.
 *
 * @param styles - The styles object from which to extract dynamic property options.
 * @returns An object containing the dynamic property options.
 */
function extractDynamicPropOptions(styles) {
    var props = styles['props'];
    if (!isObject(props)) {
        return {};
    }
    return Object.entries(props).reduce(function (acc, _a) {
        var key = _a[0], value = _a[1];
        if (isObject(value)) {
            var optionKeys = Object.keys(value).filter(function (subKey) { return typeof value[subKey] === 'string'; });
            if (optionKeys.length > 0) {
                acc[key] = optionKeys; // Store the keys as options for top-level properties
            }
            // Special handling for nested properties under 'icon'
            if (key === 'icon') {
                Object.entries(value).forEach(function (_a) {
                    var iconKey = _a[0], iconValue = _a[1];
                    if (isObject(iconValue)) {
                        acc["icon.".concat(iconKey)] = Object.keys(iconValue); // Store the keys as options for nested icon properties
                    }
                });
            }
        }
        return acc;
    }, {});
}
/**
 * Generates dynamic arg types for Storybook based on the provided options.
 * @param options - The options object containing the possible values for each argument.
 * @returns The generated arg types object.
 */
function generateDynamicArgTypes(options) {
    return Object.keys(options).reduce(function (acc, key) {
        var _a;
        var optionValues = options[key];
        var metadata = propMetadata[key];
        var controlType = 'select'; // Default control type
        // Check if metadata.control is directly a ControlType
        if (typeof (metadata === null || metadata === void 0 ? void 0 : metadata.control) === 'string') {
            controlType = metadata.control;
        }
        // Check if metadata.control is an object with a 'type' property
        else if ((metadata === null || metadata === void 0 ? void 0 : metadata.control) && 'type' in metadata.control) {
            controlType = metadata.control.type;
        }
        var category = 'Other'; // Default category
        // Check if key is a nested property and its parent has a table.category
        if (key.includes('.')) {
            // check if parent key exists in propMetadata
            var parentKey = key.split('.')[0];
            if (propMetadata[parentKey]) {
                category = (_a = propMetadata[parentKey].category) !== null && _a !== void 0 ? _a : 'Other';
            }
        }
        // Assign controlType to control.type
        acc[key] = {
            control: { type: controlType },
            options: optionValues,
            description: (metadata === null || metadata === void 0 ? void 0 : metadata.description) || "Styles for ".concat(key),
            defaultValue: metadata === null || metadata === void 0 ? void 0 : metadata.defaultValue,
            table: {
                category: category, // Set category here
            },
        };
        return acc;
    }, {});
}
export { extractDynamicPropOptions, generateDynamicArgTypes, propMetadata, isObject };
