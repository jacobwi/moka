import { ArgTypes } from "@storybook/types";

/**
 * Represents the type of control for a storybook component.
 */
type ControlType =
  | "object"
  | "boolean"
  | "check"
  | "inline-check"
  | "radio"
  | "inline-radio"
  | "select"
  | "multi-select"
  | "number"
  | "range"
  | "file"
  | "color"
  | "date"
  | "text";

/**
 * Represents the metadata for a component prop.
 */
type PropMetadata = {
  description: string;
  category?: string;
  defaultValue?: string;
  control?: ControlType | { type: ControlType };
  options?: string[];
  table?: {
    category?: string;
  };
};
/**
 * Metadata for component props.
 */
const propMetadata: Record<string, PropMetadata> = {
  variant: {
    description: "Selects the button style variant.",
    category: "Appearance",
    defaultValue: "primary",
  },
  size: {
    description: "Determines the size of the button.",
    category: "Appearance",
    defaultValue: "md",
  },
  iconPosition: {
    control: { type: "radio" },
    options: ["left", "right"],
    defaultValue: "left",
    description: "Position of the icon relative to the button text",
    table: {
      category: "Icon",
    },
  },
  icon: {
    description: "Styles for the icon",
    category: "Icon",
  },
};
/**
 * Checks if a value is an object.
 * @param value - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
/**
 * Extracts dynamic property options from a styles object.
 *
 * @param styles - The styles object from which to extract dynamic property options.
 * @returns An object containing the dynamic property options.
 */
function extractDynamicPropOptions(
  styles: Record<string, unknown>,
): Record<string, string[]> {
  const props = styles["props"];

  if (!isObject(props)) {
    return {};
  }

  return Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (isObject(value)) {
        const optionKeys = Object.keys(value).filter(
          (subKey) => typeof value[subKey] === "string",
        );
        if (optionKeys.length > 0) {
          acc[key] = optionKeys; // Store the keys as options for top-level properties
        }
        // Special handling for nested properties under 'icon'
        if (key === "icon") {
          Object.entries(value).forEach(([iconKey, iconValue]) => {
            if (isObject(iconValue)) {
              acc[`icon.${iconKey}`] = Object.keys(iconValue); // Store the keys as options for nested icon properties
            }
          });
        }
      }
      return acc;
    },
    {} as Record<string, string[]>,
  );
}
/**
 * Generates dynamic arg types for Storybook based on the provided options.
 * @param options - The options object containing the possible values for each argument.
 * @returns The generated arg types object.
 */
function generateDynamicArgTypes(options: Record<string, string[]>): ArgTypes {
  return Object.keys(options).reduce<ArgTypes>((acc, key) => {
    const optionValues = options[key];
    const metadata = propMetadata[key as keyof typeof propMetadata];

    let controlType: ControlType = "select"; // Default control type

    // Check if metadata.control is directly a ControlType
    if (typeof metadata?.control === "string") {
      controlType = metadata.control as ControlType;
    }
    // Check if metadata.control is an object with a 'type' property
    else if (metadata?.control && "type" in metadata.control) {
      controlType = metadata.control.type;
    }

    let category = "Other"; // Default category

    // Check if key is a nested property and its parent has a table.category
    if (key.includes(".")) {
      // check if parent key exists in propMetadata
      const parentKey = key.split(".")[0];
      if (propMetadata[parentKey]) {
        category = propMetadata[parentKey].category ?? "Other";
      }
    }

    // Assign controlType to control.type
    acc[key] = {
      control: { type: controlType },
      options: optionValues,
      description: metadata?.description || `Styles for ${key}`,
      defaultValue: metadata?.defaultValue,
      table: {
        category: category, // Set category here
      },
    };
    return acc;
  }, {});
}

export {
  extractDynamicPropOptions,
  generateDynamicArgTypes,
  propMetadata,
  isObject,
};
