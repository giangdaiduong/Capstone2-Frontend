import { httpServerApi } from '@/api-base';
import CreateIdeaPageClient from './page-client';
import { CategoryServiceIds } from '@/api-base/services/category-service';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { UserRole } from '@/utils/constants';
import linkTo from '@/utils/linkTo';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  return {
    title: 'Thêm ý tưởng',
  };
}

async function CreateIdeaPage() {
  const session = await getServerSession(authOptions);

  if (!session || session?.user?.roleName !== UserRole.Founder) {
    redirect(linkTo.login);
  }

  const res = await (await httpServerApi()).execService({ id: CategoryServiceIds.GetAllCategories });

  if (!res.ok) {
    return <div>Lỗi khi lấy danh sách danh mục</div>;
  }

  const categories = res.data || [];

  return <CreateIdeaPageClient categories={categories} />;
}

export default CreateIdeaPage;
