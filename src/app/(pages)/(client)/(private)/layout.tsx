import AuthGuard from '@/hocs/AuthGuard';
import type { ChildrenType } from '@/types/common';

function ClientLayout({ children }: ChildrenType) {
  return <AuthGuard>{children}</AuthGuard>;
}

export default ClientLayout;
