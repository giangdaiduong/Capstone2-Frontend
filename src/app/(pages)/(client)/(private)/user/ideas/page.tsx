import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import linkTo from '@/utils/linkTo';
import { httpServerApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { GetIdeaResponseType } from '@/types/IdeaTypes';
import IdeaPageClient from './page-client';
import { PAGE_SIZE } from '@/utils/constants';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Ý tưởng đã đăng',
};

type SearchParams = Promise<{ page: string }>;

async function IdeaPage({ searchParams }: { searchParams: SearchParams }) {
  const { page } = await searchParams;
  const pageNum = parseInt(page || '1', 10);

  if (!page || isNaN(pageNum) || pageNum < 1) {
    redirect(`${linkTo.user.ideas.base}?page=1`);
  }

  const res = await (
    await httpServerApi()
  ).execService(
    { id: IdeaServiceIds.GetPublicIdeas },
    {
      PageIndex: pageNum - 1,
      PageSize: PAGE_SIZE,
    }
  );

  if (!res.ok) {
    throw new Error(res?.data?.message || 'Lỗi khi lấy danh sách ý tưởng đã đăng');
  }

  const ideasRes = res.data as GetIdeaResponseType;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Danh sách ý tưởng đã đăng</h1>
        <Link href={linkTo.user.ideas.create}>
          <Button>
            <PlusIcon /> Đăng ý tưởng mới
          </Button>
        </Link>
      </div>
      <IdeaPageClient ideasRes={ideasRes} />
    </div>
  );
}

export default IdeaPage;
