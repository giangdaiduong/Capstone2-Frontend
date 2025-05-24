// Third-party Imports
import { getServerSession } from 'next-auth';

// Type Imports
import type { ChildrenType } from '@/types/common';

// Component Imports
import AuthRedirect from '@/components/AuthRedirect';
import { authOptions } from '@/lib/auth';

export default async function AuthGuard({ children, roles }: ChildrenType & { roles?: string[] }) {
  const session = await getServerSession(authOptions);

  if (roles) {
    if (!roles.includes(session?.user?.roleName || '')) {
      return <AuthRedirect />;
    }
  }

  return <>{session ? children : <AuthRedirect />}</>;
}
