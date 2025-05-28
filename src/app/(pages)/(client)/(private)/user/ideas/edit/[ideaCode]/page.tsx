import { httpServerApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { IdeaType } from '@/types/IdeaTypes';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { CategoryServiceIds } from '@/api-base/services/category-service';
import EditIdeaPageClient from './page.client';

type Params = Promise<{ ideaCode: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { ideaCode } = await params;

  const res = await (
    await httpServerApi()
  ).execService({
    id: IdeaServiceIds.GetIdeaById,
    params: { ideaId: ideaCode },
  });

  if (!res.ok) {
    return {
      title: 'Ý tưởng không tồn tại',
      description: 'Không thể tìm thấy ý tưởng này',
    };
  }

  const idea = res.data as IdeaType;

  return {
    title: idea.title || 'Ý tưởng',
    description: idea.description || '',
  };
}

export default async function IdeasDetailPage({ params }: { params: Params }) {
  const { ideaCode } = await params;

  // Sửa lại BE sử dụng ideaCode thay vì ideaId
  const res = await (
    await httpServerApi()
  ).execService({
    id: IdeaServiceIds.GetIdeaById,
    params: { ideaId: ideaCode },
  });

  console.log(res);

  if (!res.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Không thể tìm thấy ý tưởng này</AlertTitle>
      </Alert>
    );
  }

  const categoriesRes = await (await httpServerApi()).execService({ id: CategoryServiceIds.GetAllCategories });

  if (!categoriesRes.ok) {
    return <div>Lỗi khi lấy danh sách danh mục</div>;
  }

  const idea = { ...res.data, id: ideaCode } as IdeaType;
  const categories = categoriesRes.data || [];

  return <EditIdeaPageClient idea={idea} categories={categories} />;
}
