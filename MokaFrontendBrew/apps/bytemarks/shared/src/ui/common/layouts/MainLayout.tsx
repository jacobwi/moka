import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-theme-bg text-theme-text">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
