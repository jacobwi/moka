import React, { ReactNode, isValidElement } from "react";

type LayoutType = "topbar" | "sidebar" | "custom";

interface LayoutManagerProps {
  layout: LayoutType;
  customLayout?: ReactNode;
  customHeader?: ReactNode;
  children: ReactNode;
}

const TopBarLayout: React.FC<{ header?: ReactNode; children: ReactNode }> = ({
  header,
  children,
}) => (
  <div className="flex flex-col h-screen">
    <header className="bg-gray-800 text-white p-4">
      {isValidElement(header) ? header : <DefaultHeader />}
    </header>
    <main className="flex-1 overflow-auto">{children}</main>
  </div>
);

const SideBarLayout: React.FC<{ header?: ReactNode; children: ReactNode }> = ({
  header,
  children,
}) => (
  <div className="flex h-screen">
    <aside className="w-64 bg-gray-800 text-white p-4">Sidebar</aside>
    <main className="flex-1 overflow-auto">
      {isValidElement(header) ? header : <DefaultHeader />}
      {children}
    </main>
  </div>
);

const DefaultHeader: React.FC = () => (
  <div className="flex justify-between items-center h-12">
    <span>Default Header</span>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Action
    </button>
  </div>
);

const LayoutManager: React.FC<LayoutManagerProps> = ({
  layout,
  customLayout,
  customHeader,
  children,
}) => {
  if (layout === "custom" && isValidElement(customLayout)) {
    return <>{customLayout}</>;
  }

  switch (layout) {
    case "topbar":
      return <TopBarLayout header={customHeader}>{children}</TopBarLayout>;
    case "sidebar":
      return <SideBarLayout header={customHeader}>{children}</SideBarLayout>;
    default:
      console.warn(
        `LayoutManager: Unrecognized layout type '${layout}' or missing 'customLayout' prop.`,
      );
      return <>{children}</>;
  }
};

export default LayoutManager;
