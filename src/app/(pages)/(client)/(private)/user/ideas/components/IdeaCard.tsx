'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IdeaType } from '@/types/IdeaTypes';
import { formatDate } from 'date-fns';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FaComments, FaStar } from 'react-icons/fa';
import { useState, useTransition } from 'react';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { httpPageApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { CloseAllToast, errorToast, successToast } from '@/lib/toastify';
import linkTo from '@/utils/linkTo';
import { IdeaStage } from '@/utils/constants';

function IdeaCard({ idea }: { idea: IdeaType }) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(idea.totalLikes);

  const handleLikeClick = () => {
    CloseAllToast();
    startTransition(async () => {
      if (isLiked) {
        const res = await httpPageApi.execService({
          id: IdeaServiceIds.DislikeIdea,
          params: { ideaId: idea.id },
        });

        if (!res.ok) {
          errorToast(res?.data?.message || 'Lỗi khi bỏ thích ý tưởng');
          return;
        }

        successToast('Bỏ thích ý tưởng thành công');
        setIsLiked(false);
        setTotalLikes(totalLikes - 1);
      } else {
        const res = await httpPageApi.execService({
          id: IdeaServiceIds.LikeIdea,
          params: { ideaId: idea.id },
        });

        if (!res.ok) {
          errorToast(res?.data?.message || 'Lỗi khi thích ý tưởng');
          return;
        }

        successToast('Thích ý tưởng thành công');
        setIsLiked(true);
        setTotalLikes(totalLikes + 1);
      }
    });
  };

  return (
    <Card className="overflow-hidden bg-white shadow-md border-l-4 border-[#1A2B88] p-4 gap-2">
      <div className="flex justify-between mb-2">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-gray-800">{idea.title}</h3>
          <p className="text-sm text-gray-500">
            <Link href={`${linkTo.profile}/${idea.createdBy}`}>{idea.initiator}</Link> - Ngày đăng:{' '}
            {formatDate(idea.createdOn, 'dd/MM/yyyy')} | <span className="italic">Lĩnh vực: {idea.category}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 items-end ">
          {idea.copyrightStatus ? (
            <span className={`px-3 py-1 text-sm font-medium rounded-md bg-green-100 text-green-600`}>
              Đã đăng ký bản quyền
            </span>
          ) : (
            <span className={`px-3 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-600`}>
              Chưa đăng ký bản quyền
            </span>
          )}

          <span className={`px-3 py-1 text-sm font-medium rounded-md h-fit text-center ${getStageStyle(idea.stage)}`}>
            {IdeaStage.find(stage => stage.key === idea.stage)?.value || 'Chưa xác định'}
          </span>
        </div>
      </div>
      <div className="text-gray-600 mb-3">
        <strong>Tóm tắt ý tưởng</strong>:<div className="whitespace-pre-line">{idea.description}</div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex flex-col md:flex-row gap-4">
          <span
            className="flex items-center gap-2 px-3 py-2 text-sm
                            font-medium rounded-md h-fit bg-blue-800
                            text-white cursor-pointer transform transition-transform duration-200 hover:scale-110"
            onClick={handleLikeClick}
          >
            {isLiked ? <AiFillDislike /> : <AiFillLike />} {totalLikes} Lượt thích
          </span>
          <span className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md h-fit bg-gray-500 text-white">
            <FaComments /> {idea.totalComments} Bình luận
          </span>
          <span className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md h-fit text-yellow-500">
            <FaStar /> {idea.totalRatings} Điểm đánh giá
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href={linkTo.user.ideas.detail.replace('[ideaCode]', idea.id)} className="cursor-pointer">
            <Button variant={'outline'}>Xem chi tiết</Button>
          </Link>
          {session?.user?.id === idea.createdBy && (
            <Link href={linkTo.user.ideas.edit.replace('[ideaCode]', idea.id)} className="cursor-pointer">
              <Button variant={'outline'}>Chỉnh sửa</Button>
            </Link>
          )}
        </div>
      </div>
      <ShowLoading isPending={isPending} />
    </Card>
  );
}

export default IdeaCard;

const getStageStyle = (stage: string) => {
  switch (stage) {
    case 'NEW':
      return 'bg-green-100 text-green-600';
    case 'MVP':
      return 'bg-yellow-100 text-yellow-600';
    case 'GROWTH':
      return 'bg-blue-100 text-blue-600';
    case 'EXPANSION':
      return 'bg-purple-100 text-purple-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};
