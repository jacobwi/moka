// Layout.tsx

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ width: "800px", height: "600px" }}>
      <header>{/* Your header content here */}</header>
      <main>{children}</main>
      <footer>{/* Your footer content here */}</footer>
    </div>
  );
};

export default Layout;
