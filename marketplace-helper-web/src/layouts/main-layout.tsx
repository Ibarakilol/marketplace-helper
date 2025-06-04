import type { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
}

const MainLayout = observer(({ children, title }: MainLayoutProps) => {
  return (
    <div className="grid grid-cols-[48px_1fr] grid-rows-[72px_1fr] [grid-template-areas:'navbar_header''navbar_.'] h-screen w-full">
      <Navbar />
      <Header title={title} />
      {children}
    </div>
  );
});

export default MainLayout;
