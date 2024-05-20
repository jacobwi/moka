const TabPanel = ({
  isSelected,
  children,
}: {
  isSelected: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`transition-all ease-in-out duration-500 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} p-4 bg-theme-card-bg rounded-md shadow-lg`}
      style={{
        maxHeight: isSelected ? "none" : "0",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default TabPanel;
