import React from "react";
import { inputStyles } from "./Input.styles";
import { twMerge } from "tailwind-merge";
import IconWrapper from "../IconWrapper/IconWrapper";
import type { IconBaseProps } from "../IconWrapper/IconWrapper";

type InputStyleProps = (typeof inputStyles)["props"];

type InputProps = {
  [K in keyof InputStyleProps]?: keyof InputStyleProps[K];
} & React.InputHTMLAttributes<HTMLInputElement> & {
    iconName?: string;
    iconProps?: IconBaseProps;
  };

const Input: React.FC<InputProps> = ({
  className,
  iconName,
  iconProps = {},
  variant = "classic", // Default variant
  ...rest
}) => {
  const variantClasses = inputStyles.props.variant[variant] || "";
  const iconClasses = iconName
    ? `${inputStyles.props.icon.size[iconProps.size || "md"]} ${inputStyles.props.icon.color[rest.state || "default"]}`
    : "";

  const inputClasses = twMerge(inputStyles.base, variantClasses, className);

  return (
    <div className={`relative ${variant === "floating" ? "mt-2" : ""}`}>
      {iconName && (
        <div
          className={`absolute inset-y-0 ${iconProps.position === "right" ? "right-0 pr-3" : "left-0 pl-3"} flex items-center`}
        >
          <IconWrapper
            iconName={iconName}
            {...iconProps}
            className={iconClasses}
          />
        </div>
      )}
      <input
        className={`${inputClasses} ${iconName ? (iconProps.position === "right" ? "pr-10" : "pl-10") : ""}`}
        {...rest}
      />
    </div>
  );
};

export { Input, type InputProps, inputStyles };
