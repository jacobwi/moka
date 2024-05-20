import { Position } from '@shared/models';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  iconPosition?: Position;
  colorTheme?: string; // For background color
  textColorTheme?: string; // For text color
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  hoverClass?: string; // New prop for hover styles
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  icon,
  className = '',
  type = 'button',
  disabled = false,
  iconPosition = Position.LEFT,
  colorTheme = 'theme-accent', // Default background color theme
  textColorTheme = 'theme-button-text', // Default text color theme
  shadow = 'none',
  size = 'md',
  variant = 'solid',
  rounded = 'md',
  hoverClass = '', // Default to no additional hover styles
}) => {
  const renderContent = () => (
    <>
      {iconPosition === Position.LEFT && icon && (
        <span className={label ? 'mr-2' : ''}>{icon}</span>
      )}
      {label}
      {iconPosition === Position.RIGHT && icon && (
        <span className={label ? 'ml-2' : ''}>{icon}</span>
      )}
    </>
  );

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-2.5',
  };

  const roundedClass = rounded !== 'none' ? `rounded-${rounded}` : '';
  const shadowClass = shadow !== 'none' ? `shadow-${shadow}` : '';

  const variantClasses = {
    solid: `bg-${colorTheme} border border-transparent ${hoverClass}`,
    outline: `border-2 border-${colorTheme} bg-transparent text-${colorTheme} ${hoverClass}`,
    ghost: `text-${colorTheme} bg-transparent ${hoverClass}`,
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center ${sizeClasses[size]} ${roundedClass} ${shadowClass} ${variantClasses[variant]} focus:outline-none focus:ring-2 focus:ring-offset-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      style={{
        color: textColorTheme.startsWith('text-')
          ? undefined
          : `var(--${textColorTheme})`,
      }} // Apply text color using style if it's a CSS variable
      type={type}
      disabled={disabled}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
