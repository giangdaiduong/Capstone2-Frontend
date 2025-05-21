import AuthGuard from '@/hocs/AuthGuard';
import type { ChildrenType } from '@/types/common';

function PrivateLayout({ children }: ChildrenType) {
  return <AuthGuard>{children}</AuthGuard>;
}

export default PrivateLayout;
