import { httpServerApi } from '@/api-base';
import { FeedServiceIds } from '@/api-base/services/feed-services';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { IdeaType } from '@/types/IdeaTypes';
import { AlertCircle } from 'lucide-react';
import { Metadata } from 'next';
import FeedCard from './components/FeedCard';

export const metadata: Metadata = {
  title: 'Cộng đồng',
};

async function FeedPage() {
  const feedRes = await (await httpServerApi()).execService({ id: FeedServiceIds.GetFeeds });

  if (!feedRes.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy Feed!</AlertTitle>
      </Alert>
    );
  }

  const ideas = feedRes.data as IdeaType[];

  return (
    <div className="rounded-lg border border-indigo-300 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-pink-100 text-white p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Feed</h1>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4 items-center">
        {ideas.length > 0 ? (
          ideas.map(idea => <FeedCard key={idea.ideaCode} idea={idea} from="feed" />)
        ) : (
          <div className="text-center text-gray-500">Không có bài viết nào</div>
        )}
      </div>
    </div>
  );
}

export default FeedPage;
