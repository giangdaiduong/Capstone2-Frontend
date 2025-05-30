import { Metadata } from 'next';
import UserProfileClient from './page-client';
import { httpServerApi } from '@/api-base';
import { UserServiceIds } from '@/api-base/services/user-services';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { RoleServiceIds } from '@/api-base/services/role-services';
import { RoleType } from '@/types/RoleTypes';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Quản lý tài khoản',
};

async function UserProfilePage() {
  const session = await getServerSession(authOptions);

  const res = await (
    await httpServerApi()
  ).execService({ id: UserServiceIds.GetUserProfile }, { id: session?.user.id });

  const resRoles = await (await httpServerApi()).execService({ id: RoleServiceIds.GetPublicRoles });

  if (!res.ok || !resRoles.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy thông tin tài khoản</AlertTitle>
      </Alert>
    );
  }

  const roles = resRoles.data as RoleType[];

  const user = res.data;

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Quản lý tài khoản</h3>
        <UserProfileClient user={user} roles={roles} />
      </div>
    </div>
  );
}

export default UserProfilePage;
