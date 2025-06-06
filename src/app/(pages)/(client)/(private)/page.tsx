import { httpServerApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { IdeaType } from '@/types/IdeaTypes';
import { Metadata } from 'next';
import HomePageClient from './page.client';
import HomePhilosophySection from './components/HomePhilosophySection';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trang chủ',
};

async function HomePage() {
  const topIdeasRes = await (await httpServerApi()).execService({ id: IdeaServiceIds.GetTopIdeas });

  if (!topIdeasRes.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy ý tưởng tốp nhất</AlertTitle>
      </Alert>
    );
  }

  const { outstandingIdeas, topRatedIdeas } = topIdeasRes.data as {
    outstandingIdeas: IdeaType[];
    topRatedIdeas: IdeaType[];
  };

  return (
    <div className="mx-auto space-y-6">
      <HomePageClient outstandingIdeas={outstandingIdeas} topRatedIdeas={topRatedIdeas} />
      <HomePhilosophySection />
    </div>
  );
}

export default HomePage;
