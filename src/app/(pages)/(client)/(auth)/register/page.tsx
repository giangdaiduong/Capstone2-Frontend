import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng ký',
};

import { httpServerApi } from '@/api-base';
import { RoleServiceIds } from '@/api-base/services/role-services';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RoleType } from '@/types/RoleTypes';
import linkTo from '@/utils/linkTo';
import Link from 'next/link';

async function RegisterPage() {
  const res = await httpServerApi.execService({ id: RoleServiceIds.GetPublicRoles });

  if (!res.ok) {
    throw new Error(res?.data?.message || 'Lỗi khi lấy danh sách vai trò');
  }

  const roles = res.data as RoleType[];

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem-200px)]">
      <Card className="flex flex-row w-full max-w-md rounded-lg shadow-lg overflow-hidden p-0">
        <div className="p-8 rounded-xl shadow-lg text-center space-y-6 w-full">
          <h2 className="text-2xl font-bold bg-gradient-to-l from-[#f64f59] via-[#c471ed] to-[#12c2e9] bg-clip-text text-transparent">
            Bạn là ai?
          </h2>
          {roles.map(role => {
            return (
              <Button
                key={role.id}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-400 cursor-pointer transition"
              >
                <Link href={`${linkTo.register}/${role.roleName}`}>{role.roleName}</Link>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default RegisterPage;
