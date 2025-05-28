import { IdeaType } from '@/types/IdeaTypes';
import HomeIdeasCarousel from './components/HomeIdeasCarousel';

function HomePageClient({
  outstandingIdeas,
  topRatedIdeas,
}: {
  outstandingIdeas: IdeaType[];
  topRatedIdeas: IdeaType[];
}) {
  return (
    <>
      <HomeIdeasCarousel ideas={outstandingIdeas} title="Những ý tưởng nổi bật" rows={2} />

      <HomeIdeasCarousel ideas={topRatedIdeas} title="Những ý tưởng được đánh giá cao" rows={2} />
    </>
  );
}

export default HomePageClient;
