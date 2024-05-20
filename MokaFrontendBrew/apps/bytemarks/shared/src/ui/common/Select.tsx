import { MdArrowDropDown } from 'react-icons/md'; // Ensure react-icons is installed
import { Position } from '../../models/enums/Position'; // Import the Position enum

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label?: string;
  labelPosition?: Position;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  label,
  labelPosition = Position.TOP, // Default to top if not specified
}) => {
  // Function to render label based on position
  const renderLabel = () => {
    return label ? (
      <label
        className={`block text-sm font-medium mb-2 dark:text-gray-200 ${labelPosition === Position.BOTTOM ? 'order-2 mt-2' : ''}`}
      >
        {label}
      </label>
    ) : null;
  };

  return (
    <div
      className={`inline-block w-full ${labelPosition === Position.LEFT || labelPosition === Position.RIGHT ? 'flex items-center space-x-3' : 'block'}`}
    >
      {labelPosition === Position.TOP || labelPosition === Position.LEFT
        ? renderLabel()
        : null}
      <div className="relative w-full">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 pr-10 appearance-none w-full focus:outline-none focus:ring-2 focus:ring-theme-accent dark:bg-gray-700 dark:text-gray-200 transition duration-200 ease-in-out"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <MdArrowDropDown className="fill-current h-4 w-4 transition-transform duration-200 ease-in-out" />
        </div>
      </div>
      {labelPosition === Position.BOTTOM || labelPosition === Position.RIGHT
        ? renderLabel()
        : null}
    </div>
  );
};

export default Select;
