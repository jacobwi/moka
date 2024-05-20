import { Position } from '@shared/models';

interface IconProp {
  component: React.ElementType;
  position?: Position;
  hoverColorClass?: string;
  cursorClass?: string; // No default value here, it will be handled in the component
}

interface TagProps {
  name: string;
  icon?: IconProp;
  additionalClassNames?: string;
  style?: React.CSSProperties;
  index?: number;
  onIconClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  name,
  icon,
  additionalClassNames,
  style,
  onIconClick,
  onClick,
  index,
}) => {
  return (
    <div
      className={`flex items-center bg-theme-accent rounded-full px-3 py-1 text-sm text-theme-text ${additionalClassNames}`}
      style={style}
      key={index}
      onClick={onClick}
    >
      {icon && icon.position === Position.LEFT && (
        <span
          className={`mr-1 ${icon.cursorClass || 'cursor-pointer'} ${icon.hoverColorClass ? `hover:${icon.hoverColorClass}` : ''}`}
          onClick={onIconClick}
        >
          <icon.component size={16} />
        </span>
      )}
      <span>{name}</span>
      {icon && icon.position === Position.RIGHT && (
        <span
          className={`ml-1 ${icon.cursorClass || 'cursor-pointer'} ${icon.hoverColorClass ? `hover:${icon.hoverColorClass}` : ''}`}
          onClick={onIconClick}
        >
          <icon.component size={16} />
        </span>
      )}
    </div>
  );
};
