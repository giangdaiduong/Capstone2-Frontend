// Third-party Imports
import { getServerSession } from 'next-auth';

// Type Imports
import type { ChildrenType } from '@/types/common';

// Component Imports
import AuthRedirect from '@/components/AuthRedirect';

export default async function AuthGuard({ children }: ChildrenType) {
  const session = await getServerSession();

  return <>{session ? children : <AuthRedirect />}</>;
}
