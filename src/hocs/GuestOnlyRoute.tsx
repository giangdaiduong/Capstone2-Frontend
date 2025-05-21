// Next Imports
import { redirect } from 'next/navigation';

// Third-party Imports
import { getServerSession } from 'next-auth';

// Type Imports
import type { ChildrenType } from '@/types/common';
import { authOptions } from '@/lib/auth';

const GuestOnlyRoute = async ({ children }: ChildrenType) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <>{children}</>;
};

export default GuestOnlyRoute;
