import { useRef, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';

const InputField = ({
  icon,
  onIconClick,
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  id,
  additionalClasses = '',
  required = false,
  autoFocus = false,
  editable = true,
}: {
  icon?: React.ReactNode;
  onIconClick?: () => void;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  id?: string;
  additionalClasses?: string;
  required?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`flex flex-col gap-2 ${additionalClasses}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-theme-text">
          {label}
        </label>
      )}
      <div
        className={`relative flex items-center ${editable ? 'border-2 border-theme-border' : 'border-2 border-transparent'} rounded-lg overflow-hidden shadow-sm transition-all`}
      >
        {icon && (
          <div
            className="px-3 text-theme-text cursor-pointer"
            onClick={onIconClick}
          >
            {icon}
          </div>
        )}
        <input
          ref={inputRef}
          required={required}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 focus:outline-none text-theme-text transition-all ${editable ? 'bg-theme-input-bg' : 'bg-theme-card-bg cursor-not-allowed'} focus:border-l-4 focus:border-theme-accent`}
          disabled={!editable}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span
          className={`absolute inset-y-0 right-0 pr-3 flex items-center ${editable ? 'visible' : 'invisible'}`}
        >
          {editable && (
            <MdEdit
              className="text-theme-accent cursor-pointer"
              onClick={onIconClick}
            />
          )}
        </span>
      </div>
      {error && (
        <span id={`${id}-error`} className="text-sm text-theme-error">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
