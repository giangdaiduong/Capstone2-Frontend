import { Metadata } from 'next';
import UsersPageClient from './page-client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { httpServerApi } from '@/api-base';
import { UserServiceIds } from '@/api-base/services/user-services';
import { UserType } from '@/types/UserType';

export const metadata: Metadata = {
  title: 'Quản lý người dùng',
};

async function UsersPage() {
  const res = await (await httpServerApi()).execService({ id: UserServiceIds.GetAllUsers });

  if (!res.ok) {
    throw new Error(res?.data?.message || 'Lỗi khi lấy danh sách người dùng');
  }

  const users = res.data.items as UserType[];

  return (
    <Card>
      <CardHeader>
        <h1 className="text-3xl font-bold text-blue-700">Quản lý người dùng</h1>
      </CardHeader>
      <CardContent>
        <UsersPageClient users={users} />
      </CardContent>
    </Card>
  );
}

export default UsersPage;
