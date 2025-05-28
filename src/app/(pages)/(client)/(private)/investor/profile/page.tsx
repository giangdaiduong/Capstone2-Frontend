import { httpServerApi } from '@/api-base';
import { CategoryServiceIds } from '@/api-base/services/category-service';
import InvestorProfilePageClient from './page.client';
import { UserServiceIds } from '@/api-base/services/user-services';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import linkTo from '@/utils/linkTo';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Thông tin nhà đầu tư',
  };
}

export default async function InvestorProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect(linkTo.login);
  }

  const cateRes = await (await httpServerApi()).execService({ id: CategoryServiceIds.GetAllCategories });
  const userRes = await (
    await httpServerApi()
  ).execService({
    id: UserServiceIds.GetUserById,
    params: { id: session.user.id },
  });

  if (!cateRes.ok || !userRes.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy danh sách ý tưởng</AlertTitle>
      </Alert>
    );
  }

  return <InvestorProfilePageClient categories={cateRes.data} user={userRes.data} />;
}
