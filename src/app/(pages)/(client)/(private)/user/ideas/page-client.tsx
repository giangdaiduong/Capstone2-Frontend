'use client';

import { CustomPagination } from '@/components/layouts/client/Pagitation';
import IdeaCard from './components/IdeaCard';
import { GetIdeaResponseType } from '@/types/IdeaTypes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import linkTo from '@/utils/linkTo';

function IdeaPageClient({ ideasRes }: { ideasRes: GetIdeaResponseType }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [ideasRes]);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    router.push(`${linkTo.user.ideas.base}?page=${page}`);
  };

  return (
    <>
      {ideasRes.total > 0 ? (
        <>
          {ideasRes.items.map(idea => {
            return <IdeaCard key={idea.id} idea={idea} />;
          })}
          <CustomPagination
            totalPages={Math.ceil(ideasRes.total / ideasRes.pageSize)}
            currentPage={ideasRes.pageIndex + 1}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">Không có ý tưởng đã đăng</h2>
        </div>
      )}
    </>
  );
}

export default IdeaPageClient;
