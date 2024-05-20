import { useUserSettings } from '@shared/hooks';
import MainLayout from './MainLayout';
import SidebarLayout from './SidebarLayout';

export const LayoutManager = ({ children }: { children: React.ReactNode }) => {
  const { settings } = useUserSettings();

  let LayoutComponent = null;

  switch (settings.layout) {
    case 'main':
      LayoutComponent = MainLayout;
      break;
    case 'sidebar':
      LayoutComponent = SidebarLayout;
      break;
    default:
      LayoutComponent = MainLayout;
  }
  return <LayoutComponent>{children}</LayoutComponent>;
};
