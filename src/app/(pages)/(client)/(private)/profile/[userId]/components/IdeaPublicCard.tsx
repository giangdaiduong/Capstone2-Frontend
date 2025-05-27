'use client';

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IdeaType } from '@/types/IdeaTypes';
import { UserType } from '@/types/UserType';
import { formatDate } from 'date-fns';
import { CloseAllToast, errorToast, successToast } from '@/lib/toastify';
import { httpPageApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FaComments, FaEllipsisV, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import linkTo from '@/utils/linkTo';
import { Button } from '@/components/ui/button';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { FeedServiceIds } from '@/api-base/services/feed-services';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function IdeaPublicCard({ idea, user }: { idea: IdeaType; user: UserType }) {
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(idea.totalLikes);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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

  const handleHideClick = () => {
    CloseAllToast();
    startTransition(async () => {
      const res = await httpPageApi.execService({
        id: FeedServiceIds.HideFeeds,
        params: { ideaId: idea.id },
      });

      if (!res.ok) {
        errorToast(res?.data?.message || 'Lỗi khi ẩn bài viết');
        return;
      }

      successToast('Ẩn bài viết thành công');
    });

    router.refresh();
  };

  const handleMarkAsReadClick = () => {
    CloseAllToast();
    startTransition(async () => {
      const res = await httpPageApi.execService({
        id: FeedServiceIds.ReadFeeds,
        params: { ideaId: idea.id },
      });

      if (!res.ok) {
        errorToast(res?.data?.message || 'Lỗi khi đánh dấu đã đọc');
        return;
      }

      successToast('Đánh dấu đã đọc thành công');
    });
    router.refresh();
  };

  return (
    <Card className="w-[clamp(500px,75%,100%)]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user.avatar || '/user.webp'} alt={user.fullName} />
              <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="font-bold text-xl truncate">{user.fullName}</CardTitle>
              <p className="px-1 text-sm text-gray-500">{formatDate(idea.createdOn, 'dd/MM/yyyy')}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'}>
                <FaEllipsisV />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleHideClick}>Ẩn bài viết</DropdownMenuItem>
              <DropdownMenuItem onClick={handleMarkAsReadClick}>Đánh dấu đã đọc</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-line">{idea.description}</div>
        <div className="flex justify-center items-center p-2">
          <Image src={idea.imageUrls} alt={idea.title} width={500} height={500} />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 p-2">
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
            {user.id === idea.createdBy && (
              <Link href={linkTo.user.ideas.edit.replace('[ideaCode]', idea.id)} className="cursor-pointer">
                <Button variant={'outline'}>Chỉnh sửa</Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
      <ShowLoading isPending={isPending} />
    </Card>
  );
}

export default IdeaPublicCard;
