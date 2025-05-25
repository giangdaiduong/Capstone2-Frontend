import { httpServerApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IdeaType } from '@/types/IdeaTypes';
import linkTo from '@/utils/linkTo';
import { formatDate } from 'date-fns';
import Link from 'next/link';
import { FaCalendarAlt, FaEye, FaUser } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { FaArrowLeft } from 'react-icons/fa6';
import Image from 'next/image';
import IdeasComment from './page-client';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type Params = Promise<{ ideaCode: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { ideaCode } = await params;

  const res = await (
    await httpServerApi()
  ).execService({
    id: IdeaServiceIds.GetIdeaById,
    params: { ideaId: ideaCode },
  });

  if (!res.ok) {
    return {
      title: 'Ý tưởng không tồn tại',
      description: 'Không thể tìm thấy ý tưởng này',
    };
  }

  const idea = res.data as IdeaType;

  return {
    title: idea.title || 'Ý tưởng',
    description: idea.description || '',
  };
}

export default async function IdeasDetailPage({ params }: { params: Params }) {
  const { ideaCode } = await params;

  // Sửa lại BE sử dụng ideaCode thay vì ideaId
  const res = await (
    await httpServerApi()
  ).execService({
    id: IdeaServiceIds.GetIdeaById,
    params: { ideaId: ideaCode },
  });

  if (!res.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Không thể tìm thấy ý tưởng này</AlertTitle>
      </Alert>
    );
  }

  const idea = { ...res.data, id: ideaCode } as IdeaType;

  return (
    <div className="flex flex-col gap-4">
      <Link href={linkTo.user.ideas.base}>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <FaArrowLeft />
          Quay lại danh sách ý tưởng
        </Button>
      </Link>
      <Card className="bg-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">{idea.title}</CardTitle>
          <div className="text-sm text-gray-600 ml-2">Mã: {idea.ideaCode}</div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 ml-2">
            <span className="flex items-center">
              <FaUser className="inline mr-1" />
              Người đăng:{' '}
              {idea.initiator ? <Link href={`${linkTo.profile}/${idea.createdBy}`}>{idea.initiator}</Link> : 'Ẩn danh'}
            </span>
            <span className="flex items-center">
              <BiCategory className="inline mr-1" />
              Danh mục: {idea.category}
            </span>
            <span className="flex items-center">
              <FaCalendarAlt className="inline mr-1" /> Ngày đăng: {formatDate(idea.createdOn, 'dd/MM/yyyy')}
            </span>
            <span className="flex items-center">
              <FaEye className="inline mr-1" /> {idea.totalViews} lượt xem
            </span>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-blue-700">Nội dung ý tưởng</h2>
        </CardHeader>
        <CardContent>{idea.description}</CardContent>
        <CardFooter>
          <div>
            <h4 className="text-lg font-bold">Hình ảnh minh hoạ</h4>
            <Image src={idea.imageUrls} alt={idea.title} width={500} height={500} />
          </div>
        </CardFooter>
      </Card>

      <IdeasComment idea={idea} />
    </div>
  );
}
