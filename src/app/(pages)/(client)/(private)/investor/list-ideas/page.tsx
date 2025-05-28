import { httpServerApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { IdeaSuggestionType } from '@/types/IdeaTypes';
import { AlertCircle } from 'lucide-react';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import ListIdeasPageClient from './page.client';

export async function generateMetadata() {
  return {
    title: 'Ý tưởng gợi ý',
  };
}

export default async function ListIdeasPage() {
  const ideaRes = await (await httpServerApi()).execService({ id: IdeaServiceIds.GetIdeasSuggestion });

  if (!ideaRes.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy danh sách ý tưởng</AlertTitle>
      </Alert>
    );
  }

  const ideas = ideaRes.data as IdeaSuggestionType[];

  return (
    <div>
      <div className="rounded-lg border border-indigo-400 bg-gradient-to-r from-indigo-600 to-pink-300 text-white p-4">
        <h2 className="flex items-center text-lg font-semibold">
          <MdOutlineSettingsSuggest className="mr-2 text-xl" />
          Danh sách ý tưởng gợi ý
        </h2>
      </div>
      <div className="mt-4 w-full">
        <ListIdeasPageClient ideas={ideas} />
      </div>
    </div>
  );
}
