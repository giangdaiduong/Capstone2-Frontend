import FooterClient from '@/components/layouts/client/FooterClient';
import HeaderClient from '@/components/layouts/client/HeaderClient';
import type { ChildrenType } from '@/types/common';

function Layout({ children }: ChildrenType) {
  return (
    <>
      <HeaderClient />
      <main className="p-4 min-h-[calc(100vh-4rem-168px)]">{children}</main>
      <FooterClient />
    </>
  );
}

export default Layout;
