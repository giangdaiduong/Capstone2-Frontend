import HeaderClient from '@/components/layouts/client/HeaderClient';
import type { ChildrenType } from '@/types/common';

function Layout({ children }: ChildrenType) {
  return (
    <>
      <HeaderClient />
      {children}
    </>
  );
}

export default Layout;
