import GuestOnlyRoute from '@/hocs/GuestOnlyRoute';
import type { ChildrenType } from '@/types/common';

function AuthLayout({ children }: ChildrenType) {
  return <GuestOnlyRoute>{children}</GuestOnlyRoute>;
}

export default AuthLayout;
