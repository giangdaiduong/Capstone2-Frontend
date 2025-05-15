// Next Imports
import { redirect } from 'next/navigation';

// Third-party Imports
import { getServerSession } from 'next-auth';

// Type Imports
import type { ChildrenType } from '@/types/common';

const GuestOnlyRoute = async ({ children }: ChildrenType) => {
  const session = await getServerSession();

  if (session) {
    redirect('/');
  }

  return <>{children}</>;
};

export default GuestOnlyRoute;
