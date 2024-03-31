// // InputText.tsx

// import React from 'react';
// import { twMerge } from 'tailwind-merge';
// import { inputStyles } from './Input.styles';
// import IconWrapper from '../IconWrapper/IconWrapper'; // Adjust the import path as necessary
// import { isObject } from '@moka/ui-utils';

// type InputStyleProps = (typeof inputStyles)['props'];

// // Omit the 'size' and any other conflicting props from the native input attributes
// type OmittedInputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

// type InputProps = {
//   [K in keyof InputStyleProps]?: keyof InputStyleProps[K];
// } & OmittedInputHTMLAttributes & {
//     iconName?: string;
//     iconPosition?: 'left' | 'right';
//     iconProps?: React.ComponentProps<typeof IconWrapper>; // Assuming IconWrapper accepts props
//   };

// const InputText: React.FC<InputProps> = ({
//   className,
//   iconName,
//   iconPosition = 'left',
//   iconProps = {},
//   ...rest
// }) => {
//   const dynamicClassNames = Object.keys(rest)
//     .filter((key) => key in inputStyles.props && key !== 'icon')
//     .map((key) => {
//       const safeKey = key as keyof InputStyleProps;
//       const propValue = rest[safeKey];
//       const styleVariant = inputStyles.props[safeKey];

//       if (typeof propValue === 'string' && isObject(styleVariant)) {
//         return styleVariant[propValue as keyof typeof styleVariant];
//       }
//       return null;
//     })
//     .filter(Boolean);

//   const containerClasses = twMerge(
//     'flex items-center',
//     iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse',
//     className
//   );
//   const inputClasses = twMerge(inputStyles.base, ...dynamicClassNames);

//   return (
//     <div className={containerClasses}>
//       {iconName && <IconWrapper iconName={iconName} {...iconProps} />}
//       <input className={inputClasses} {...rest} />
//     </div>
//   );
// };

// export default InputText;
