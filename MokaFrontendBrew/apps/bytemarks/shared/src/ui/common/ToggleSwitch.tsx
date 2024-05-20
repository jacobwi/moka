import { Position } from '../..';

export const ToggleSwitch = ({
  isChecked,
  onChange,
  label,
  labelPosition = Position.LEFT,
  icon,
  iconPosition = Position.LEFT,
  id,
}: {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelPosition?: Position;
  icon?: React.ReactNode;
  iconPosition?: Position;
  id?: string;
}) => {
  return (
    <div
      className={`flex items-center ${labelPosition === Position.RIGHT ? 'flex-row-reverse' : ''}`}
    >
      {icon && iconPosition === Position.LEFT && (
        <span className="text-theme-accent mr-2">{icon}</span>
      )}
      {label && (
        <span
          className={`text-theme-text ${icon && iconPosition === Position.LEFT ? 'ml-2' : ''}`}
        >
          {label}
        </span>
      )}
      <label className="relative inline-block w-12 h-6 cursor-pointer">
        <input
          id={id}
          name={id}
          aria-label={label}
          aria-checked={isChecked}
          role="switch"
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={isChecked}
          onChange={e => onChange(e.target.checked)}
        />
        <span
          className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${isChecked ? 'bg-theme-accent' : 'bg-theme-input-bg'}`}
        ></span>
        <span
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isChecked ? 'transform translate-x-6' : ''}`}
        ></span>
      </label>
      {icon && iconPosition === Position.RIGHT && (
        <span className="text-theme-accent ml-2">{icon}</span>
      )}
      {label && labelPosition === Position.RIGHT && (
        <span
          className={`text-theme-text ${icon && iconPosition === Position.RIGHT ? 'mr-2' : ''}`}
        >
          {label}
        </span>
      )}
    </div>
  );
};
