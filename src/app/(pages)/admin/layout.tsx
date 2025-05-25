import AdminHeaderClient from '@/components/layouts/admin/AdminHeaderClient';
import AuthGuard from '@/hocs/AuthGuard';
import type { ChildrenType } from '@/types/common';
import { UserRole } from '@/utils/constants';

function Layout({ children }: ChildrenType) {
  return (
    <>
      <AuthGuard roles={[UserRole.Admin]}>
        <AdminHeaderClient />
        <main className="p-4 min-h-[calc(100vh-4rem-168px)] max-w-[1200px] mx-auto">{children}</main>
      </AuthGuard>
    </>
  );
}

export default Layout;
