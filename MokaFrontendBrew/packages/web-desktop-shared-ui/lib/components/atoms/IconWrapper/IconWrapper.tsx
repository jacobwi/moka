import React, { useEffect, useState } from 'react';
import * as Icons from 'react-icons/fa';
import { IconBaseProps } from 'react-icons/lib';

// Define a type that represents the Icons import with an index signature
type IconsType = {
  [key: string]: React.ElementType;
};

const IconWrapper: React.FC<IconBaseProps & { iconName: string }> = ({
  iconName,
  ...otherProps
}) => {
  const [Icon, setIcon] = useState<React.ElementType | null>(null);

  useEffect(() => {
    const loadIcon = (): void => {
      // Cast Icons to IconsType before accessing it with a string index
      const iconComponent = (Icons as IconsType)[iconName];
      if (iconComponent) {
        setIcon(() => iconComponent);
      } else {
        console.error(`Icon not found: ${iconName}`);
      }
    };

    loadIcon();
  }, [iconName]);

  return Icon ? <Icon {...otherProps} /> : <div>Loading icon...</div>;
};

export default IconWrapper;
export type { IconBaseProps };
