import { httpServerApi } from '@/api-base';
import CreateIdeaPageClient from './page-client';
import { CategoryServiceIds } from '@/api-base/services/category-service';

export async function generateMetadata() {
  return {
    title: 'Thêm ý tưởng',
  };
}

async function CreateIdeaPage() {
  const res = await (await httpServerApi()).execService({ id: CategoryServiceIds.GetAllCategories });

  if (!res.ok) {
    return <div>Lỗi khi lấy danh sách danh mục</div>;
  }

  const categories = res.data || [];

  return <CreateIdeaPageClient categories={categories} />;
}

export default CreateIdeaPage;
