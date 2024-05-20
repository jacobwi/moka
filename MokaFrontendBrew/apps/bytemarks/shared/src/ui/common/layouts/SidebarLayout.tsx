// src/layouts/SidebarLayout.jsx

import Sidebar from './Sidebar';

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-theme-bg ml-20">
      <Sidebar />

      <main className="flex-1 p-4 text-theme-text ">{children}</main>
    </div>
  );
};

export default SidebarLayout;
