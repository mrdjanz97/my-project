import { FC, ReactNode } from 'react';
import { SideNav, TopBar } from '@src/lib/ui/components/layout';
import { Toast } from '../common';

export interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full bg-white bg-cover body-font font-poppins">
      <div className="fixed p-3 left-0 top-0 right-0 mr-6 bg-white">
        <TopBar />
      </div>
      <div className="h-full pt-24 px-12 pb-12">{children}</div>
      <SideNav />
      <Toast />
    </div>
  );
};
