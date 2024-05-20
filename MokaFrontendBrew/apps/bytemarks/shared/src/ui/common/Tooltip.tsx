import { useState } from 'react';

type TooltipProps = {
  message: string;
  children: React.ReactNode;
};

const Tooltip = ({ message, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative flex items-center">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute bottom-full mb-2 px-3 py-1 bg-black text-white text-sm rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
