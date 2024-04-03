import React from "react";
import { buttonStyles } from "./Button.styles";
import { twMerge } from "tailwind-merge";
import IconWrapper from "../IconWrapper/IconWrapper";
import type { IconBaseProps } from "../IconWrapper/IconWrapper";
import { isObject } from "@moka/ui-utils";
type ButtonStyleProps = (typeof buttonStyles)["props"];

type ButtonProps = {
  [K in keyof ButtonStyleProps]?: keyof ButtonStyleProps[K];
} & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    iconName?: string; // Existing icon name prop
    iconPosition?: "left" | "right"; // New icon position prop
    iconProps?: IconBaseProps;
  };

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  iconName,
  iconPosition = "left",
  iconProps = {},
  ...rest
}) => {
  // Filter and map through the rest props to apply top-level styles
  const dynamicClassNames = Object.keys(rest)
    .filter((key) => key in buttonStyles.props && key !== "icon") // Exclude 'icon'
    .map((key) => {
      // Asserting 'key' is a valid key of 'ButtonStyleProps'
      const safeKey = key as keyof ButtonStyleProps;

      // Now TypeScript knows 'propValue' and 'styleVariant' have specific types
      const propValue = rest[safeKey];
      const styleVariant = buttonStyles.props[safeKey];

      if (typeof propValue === "string" && isObject(styleVariant)) {
        return styleVariant[propValue as keyof typeof styleVariant];
      }
    })
    .filter(Boolean); // Filter out undefined values
  const iconClasses = Object.keys(rest)
    .filter((key) => key.startsWith("icon")) // Focus on keys related to icon styles
    .map((key) => {
      const iconProp = key.split(".")[1]; // Assuming key format like 'icon.color'
      const iconValue = rest[key as keyof typeof rest] as string;

      // Access the nested icon styles safely using type assertion
      const iconStyleVariant =
        buttonStyles.props.icon[
          iconProp as keyof typeof buttonStyles.props.icon
        ];
      if (
        isObject(iconStyleVariant) &&
        isObject(iconValue) &&
        iconValue in iconStyleVariant
      ) {
        return iconStyleVariant[iconValue as keyof typeof iconStyleVariant];
      }
    })
    .filter(Boolean)
    .join(" "); // Filter out undefined values and join classes

  const buttonClasses = twMerge(
    buttonStyles.base,
    dynamicClassNames,
    className,
  ); // Add dynamicClassNames if needed

  return (
    <button className={buttonClasses} {...rest}>
      {iconPosition === "left" && iconName && (
        <IconWrapper
          iconName={iconName}
          {...iconProps}
          className={iconClasses}
        />
      )}
      {children}
      {iconPosition === "right" && iconName && (
        <IconWrapper
          iconName={iconName}
          {...iconProps}
          className={iconClasses}
        />
      )}
    </button>
  );
};

export { Button, type ButtonProps, buttonStyles };
