const Loader = () => {
  return (
    <div className="fixed inset-0 bg-theme-bg bg-opacity-75 flex justify-center items-center z-50">
      <div
        className="animate-spin ease-linear rounded-full border-4 border-t-4 border-theme-border h-12 w-12 mb-4"
        style={{ borderTopColor: '#3498db' }}
      ></div>
    </div>
  );
};

export default Loader;
