import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { AlertCircle, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import linkTo from '@/utils/linkTo';
import { httpServerApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { IdeaType } from '@/types/IdeaTypes';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import IdeaCard from './components/IdeaCard';
import { Alert, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'Ý tưởng đã đăng',
};

async function IdeaPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(linkTo.login);
  }

  const res = await (
    await httpServerApi()
  ).execService({ id: IdeaServiceIds.GetIdeaByUserId }, { userId: session.user.id });

  if (!res.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy danh sách ý tưởng</AlertTitle>
      </Alert>
    );
  }

  const ideasRes = res.data as IdeaType[];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Ý tưởng của tôi</h1>
        <Link href={linkTo.user.ideas.create}>
          <Button>
            <PlusIcon /> Đăng ý tưởng mới
          </Button>
        </Link>
      </div>
      {ideasRes.length > 0 ? (
        <>
          {ideasRes.map(idea => {
            return <IdeaCard key={idea.id} idea={idea} />;
          })}
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">Không có ý tưởng đã đăng</h2>
        </div>
      )}
    </div>
  );
}

export default IdeaPage;
