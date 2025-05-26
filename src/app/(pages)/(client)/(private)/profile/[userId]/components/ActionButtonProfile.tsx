'use client';

import { Button } from '@/components/ui/button';
import { UserType } from '@/types/UserType';
import linkTo from '@/utils/linkTo';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';
import { IoIosChatbubbles } from 'react-icons/io';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { httpPageApi } from '@/api-base';
import { FollowServiceIds } from '@/api-base/services/follow-services';
import { errorToast, successToast } from '@/lib/toastify';

function ActionButtonProfile({ user, flower }: { user: UserType; flower: boolean }) {
  const [isFollow, setIsFollow] = useState<boolean>(flower);
  const [isPending, startTransition] = useTransition();

  const handleFollowChange = (userId: string) => {
    startTransition(async () => {
      const res = await httpPageApi.execService(
        { id: isFollow ? FollowServiceIds.Unfollow : FollowServiceIds.Follow, params: { userId } },
        {}
      );

      if (!res.ok) {
        errorToast(
          res.data?.message || (isFollow ? 'Lỗi khi bỏ theo dõi người dùng!' : 'Lỗi khi theo dõi người dùng!')
        );
        return;
      }

      successToast(
        res.data?.message || (isFollow ? 'Bỏ theo dõi người dùng thành công!' : 'Theo dõi người dùng thành công!')
      );

      setIsFollow(!isFollow);
    });
  };

  return (
    <>
      <Button
        className={
          isFollow ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
        }
        onClick={() => handleFollowChange(user.id)}
      >
        {isFollow ? (
          <div className="flex items-center gap-2">
            <RiUserFollowLine />
            <span>Đang theo dõi</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <RiUserUnfollowLine />
            <span>Theo dõi</span>
          </div>
        )}
      </Button>
      <Link href={`${linkTo.chat}/${user.id}`}>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <IoIosChatbubbles />
          Liên hệ
        </Button>
      </Link>
      <ShowLoading isPending={isPending} />
    </>
  );
}

export default ActionButtonProfile;
