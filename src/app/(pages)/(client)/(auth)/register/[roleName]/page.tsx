import { httpServerApi } from '@/api-base';
import { RoleServiceIds } from '@/api-base/services/role-services';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { RoleType } from '@/types/RoleTypes';
import { AlertCircle } from 'lucide-react';
import RegisterPageClient from './page-client';

type Params = Promise<{ roleName: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { roleName } = await params;

  return {
    title: `Đăng ký ${roleName}`,
  };
}

async function RegisterPage({ params }: { params: Params }) {
  const { roleName } = await params;

  const res = await (await httpServerApi()).execService({ id: RoleServiceIds.GetPublicRoles });

  if (!res.ok) {
    throw new Error(res?.data?.message || 'Lỗi khi lấy danh sách vai trò');
  }

  const roles = res.data as RoleType[];

  const role = roles.find(role => role.roleName === roleName);

  if (!role) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Vai trò không tồn tại!</AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem-200px)]">
      <Card className="flex flex-row w-full max-w-2xl rounded-lg shadow-lg overflow-hidden p-0">
        <div className="w-full p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-l from-[#f64f59] via-[#c471ed] to-[#12c2e9] bg-clip-text text-transparent text-center">
            Đăng ký tài khoản
          </h2>
          <p className="text-gray-600 mb-6 text-center mt-2">Vui lòng đăng ký tài khoản để tiếp tục sử dụng dịch vụ</p>
          <RegisterPageClient role={role} />
        </div>
      </Card>
    </div>
  );
}

export default RegisterPage;
