import { Metadata } from 'next';
import { httpServerApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { GetIdeaResponseType } from '@/types/IdeaTypes';
import FeedCard from '@/app/(pages)/(client)/(private)/feed/components/FeedCard';
import SearchUserClient from './searchUser.cient';
import { UserServiceIds } from '@/api-base/services/user-services';
import { UserType } from '@/types/UserType';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import linkTo from '@/utils/linkTo';
import Link from 'next/link';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'News Feed',
};

async function NewsFeedPage() {
  const res = await (await httpServerApi()).execService({ id: IdeaServiceIds.GetPublicIdeas });
  const userRes = await (await httpServerApi()).execService({ id: UserServiceIds.GetAllUsers });

  if (!res.ok || !userRes.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy ý tưởng công khai</AlertTitle>
      </Alert>
    );
  }

  const ideasRes = res.data as GetIdeaResponseType;
  const users = userRes.data.items as UserType[];

  return (
    <>
      <section className="mb-10">
        <div
          className="rounded-lg border border-indigo-400 bg-gradient-to-r from-indigo-600 to-pink-300 text-white p-4
                    flex flex-col md:flex-row justify-between items-center"
        >
          <h2 className="text-lg font-semibold">News Feed</h2>
          <SearchUserClient userList={users} />
        </div>
        <div className="p-4 flex flex-col gap-4 items-center">
          <div className="w-full">
            <Link href={linkTo.user.ideas.create}>
              <Button className="float-right">
                <PlusIcon />
                Thêm bài viết
              </Button>
            </Link>
          </div>
          {ideasRes.items.length > 0 ? (
            ideasRes.items.map(idea => <FeedCard key={idea.ideaCode} idea={idea} />)
          ) : (
            <div className="text-center text-gray-500">Không có bài viết nào</div>
          )}
        </div>
      </section>
    </>
  );
}

export default NewsFeedPage;
