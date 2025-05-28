import AuthGuard from '@/hocs/AuthGuard';
import type { ChildrenType } from '@/types/common';
import { UserRole } from '@/utils/constants';

function InvestorLayout({ children }: ChildrenType) {
  return <AuthGuard roles={[UserRole.Investor]}>{children}</AuthGuard>;
}

export default InvestorLayout;
