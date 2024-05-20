import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const CollapsiblePanel = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 bg-white rounded-lg shadow overflow-hidden dark:bg-theme-card-bg">
      <button
        className="flex items-center justify-between w-full py-3 px-4 text-left text-theme-text bg-theme-input-bg transition-colors duration-150 ease-in-out hover:bg-theme-accent-hover dark:text-theme-card-bg dark:bg-theme-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{title}</span>
        {isOpen ? (
          <IoIosArrowUp size={24} className="text-theme-accent" />
        ) : (
          <IoIosArrowDown size={24} className="text-theme-accent" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 text-theme-text transition-max-height duration-500 ease-in-out dark:bg-theme-card-bg">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsiblePanel;
