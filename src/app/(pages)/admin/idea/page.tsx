import { httpServerApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import IdeaPageClient from './page.client';
import { IdeaType } from '@/types/IdeaTypes';

export const metadata: Metadata = {
  title: 'Quản lý bài viết',
};

async function IdeaPage() {
  const res = await (await httpServerApi()).execService({ id: IdeaServiceIds.GetAllIdeas });

  if (!res.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy danh sách ý tưởng</AlertTitle>
      </Alert>
    );
  }

  const ideas = res.data.items as IdeaType[];

  return (
    <Card>
      <CardHeader>
        <h1 className="text-3xl font-bold text-blue-700">Quản lý bài viết</h1>
      </CardHeader>
      <CardContent>
        <IdeaPageClient ideas={ideas} />
      </CardContent>
    </Card>
  );
}

export default IdeaPage;
