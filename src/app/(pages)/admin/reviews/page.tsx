import { httpServerApi } from '@/api-base';
import { Metadata } from 'next';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IdeaType } from '@/types/IdeaTypes';
import ReviewsPageClient from './page-client';

/**
 * Metadata used to configure the SEO information for the Review Page.
 * 
 * @remarks
 * This metadata is applied by Next.js to set HTML `<head>` tags such as the page title.
 */
export const metadata: Metadata = {
  title: 'Xét duyệt bài viết',
};

/**
 * Renders the Review Page which displays a list of ideas to be reviewed.
 *
 * @async
 * @function
 * @throws Will throw an error if the API request to fetch ideas fails.
 * @returns A React element displaying the review interface inside a card layout.
 */
async function ReviewPage() {
  // Call the API to fetch all ideas
  const res = await (await httpServerApi()).execService({ id: IdeaServiceIds.GetAllIdeas });

  if (!res.ok) {
    throw new Error(res?.data?.message || 'Lỗi khi lấy danh sách người dùng');
  }

  const ideas = res.data?.items as IdeaType[];

  return (
    <Card>
      <CardHeader>
        <h1 className="text-3xl font-bold text-blue-700">Xét duyệt bài viết</h1>
      </CardHeader>
      <CardContent>
        <ReviewsPageClient ideas={ideas} />
      </CardContent>
    </Card>
  );
}

export default ReviewPage;
