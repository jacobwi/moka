import { ArgTypes } from '@storybook/types';
/**
 * Represents the type of control for a storybook component.
 */
type ControlType = 'object' | 'boolean' | 'check' | 'inline-check' | 'radio' | 'inline-radio' | 'select' | 'multi-select' | 'number' | 'range' | 'file' | 'color' | 'date' | 'text';
/**
 * Represents the metadata for a component prop.
 */
type PropMetadata = {
    description: string;
    category?: string;
    defaultValue?: string;
    control?: ControlType | {
        type: ControlType;
    };
    options?: string[];
    table?: {
        category?: string;
    };
};
/**
 * Metadata for component props.
 */
declare const propMetadata: Record<string, PropMetadata>;
/**
 * Checks if a value is an object.
 * @param value - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
declare function isObject(value: unknown): value is Record<string, unknown>;
/**
 * Extracts dynamic property options from a styles object.
 *
 * @param styles - The styles object from which to extract dynamic property options.
 * @returns An object containing the dynamic property options.
 */
declare function extractDynamicPropOptions(styles: Record<string, unknown>): Record<string, string[]>;
/**
 * Generates dynamic arg types for Storybook based on the provided options.
 * @param options - The options object containing the possible values for each argument.
 * @returns The generated arg types object.
 */
declare function generateDynamicArgTypes(options: Record<string, string[]>): ArgTypes;
export { extractDynamicPropOptions, generateDynamicArgTypes, propMetadata, isObject };
//# sourceMappingURL=storybookHelpers.d.ts.map