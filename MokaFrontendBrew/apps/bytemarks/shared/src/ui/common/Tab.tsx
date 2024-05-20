const Tab = ({
  isSelected,
  onClick,
  children,
}: {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={`py-2 px-4 font-medium transition-all duration-300 ${
        isSelected
          ? "bg-theme-accent text-theme-button-text border-b-4 border-theme-accent-dark shadow-lg"
          : "bg-theme-card-bg text-theme-text hover:bg-theme-accent-hover hover:text-theme-button-text"
      } focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-offset-2 rounded-t-md`}
      onClick={onClick}
      style={{
        transition: "transform 0.2s, box-shadow 0.2s",
        transform: isSelected ? "translateY(-2px)" : "none",
        boxShadow: isSelected
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)"
          : "none",
      }}
    >
      {children}
    </button>
  );
};

export default Tab;
