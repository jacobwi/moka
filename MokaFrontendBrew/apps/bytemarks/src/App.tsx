import React, { useState } from "react";
import { LayoutManager, type LayoutType } from '@moka/ui-components/layouts/LayoutManager';
import { Topbar } from '@moka/ui-components/components/organisms/Topbar/Topbar';
import { FiHome, FiSettings, FiLogOut } from 'react-icons/fi'; // Icons for the items

const topbarItems = [
  {
    icon: FiHome,
    label: 'Home',
    to: '/home', // Use 'to' for navigation
  },
  {
    icon: FiSettings,
    label: 'Settings',
    to: '/settings', // Use 'to' for navigation
  },
  {
    icon: FiLogOut,
    label: 'Logout',
    onClick: () => {
      console.log('Logout clicked'); // Use 'onClick' for custom click handling
      // Add logout logic here
    },
  },
];
function App() {
  const [layoutType, setLayoutType] = useState<LayoutType>('topbar');

  return (
    <LayoutManager layout={layoutType} customHeader={<Topbar items={topbarItems} />}>
      <div>Content goes here</div>
    </LayoutManager>
  );
}


export default App;
