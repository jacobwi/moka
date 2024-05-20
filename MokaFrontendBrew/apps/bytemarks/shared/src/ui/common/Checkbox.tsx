import { MdCheck } from 'react-icons/md'; // Import the check icon

const Checkbox = ({
  label,
  checked,
  onChange,
  icon,
}: {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode; // Make icon optional
}) => (
  <label className="inline-flex items-center cursor-pointer">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only" // Hide the default checkbox visually
      />
      <div className="w-6 h-6 flex items-center justify-center bg-theme-input-bg border-2 border-theme-border rounded-md">
        {checked && <MdCheck className="text-theme-accent" size="20" />}
      </div>
    </div>
    <span className="ml-2 text-theme-text flex items-center">
      {icon}
      {label}
    </span>
  </label>
);
export default Checkbox;
