'use client';

import { useState, useTransition } from 'react';
import { FaUserCheck, FaUserFriends } from 'react-icons/fa';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';
import { UserType } from '@/types/UserType';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import linkTo from '@/utils/linkTo';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { httpPageApi } from '@/api-base';
import { FollowServiceIds } from '@/api-base/services/follow-services';
import { errorToast, successToast } from '@/lib/toastify';
function FollowerPageClient({
  followersCount,
  followingCount,
  followers,
  following,
}: {
  followersCount: number;
  followingCount: number;
  followers: UserType[];
  following: UserType[];
}) {
  const [isPending, startTransition] = useTransition();
  const [followingList, setFollowingList] = useState<(UserType & { isFlower: boolean })[]>(
    following.map(follower => ({
      ...follower,
      isFlower: true,
    }))
  );

  const handleFollowChange = (userId: string, isFlower: boolean) => {
    startTransition(async () => {
      const res = await httpPageApi.execService(
        { id: isFlower ? FollowServiceIds.Unfollow : FollowServiceIds.Follow, params: { userId } },
        {}
      );

      if (!res.ok) {
        errorToast(
          res.data?.message || (isFlower ? 'Lỗi khi bỏ theo dõi người dùng!' : 'Lỗi khi theo dõi người dùng!')
        );
        return;
      }

      successToast(
        res.data?.message || (isFlower ? 'Bỏ theo dõi người dùng thành công!' : 'Theo dõi người dùng thành công!')
      );

      setFollowingList(prev =>
        prev.map(follower => (follower.id !== userId ? follower : { ...follower, isFlower: !isFlower }))
      );
    });
  };

  return (
    <>
      {followingCount > 0 && (
        <div>
          <div className="rounded-lg border border-indigo-400 bg-gradient-to-r from-indigo-600 to-pink-300 text-white p-4">
            <h2 className="flex items-center text-lg font-semibold">
              <FaUserCheck className="mr-2 text-xl" />
              Đang theo dõi: {followingList.filter(user => user.isFlower).length} người
            </h2>
          </div>
          <table className="mt-4 w-full">
            <tbody>
              {followingList.map(user => (
                <tr key={user.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <td className="p-4 flex justify-center">
                    <Avatar>
                      <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.fullName} />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="p-4 font-semibold">
                    Họ và Tên: <span className="font-normal">{user.fullName}</span>
                  </td>
                  <td className="p-4 font-semibold">
                    Vai trò: <span className="font-normal">{user.roleName}</span>
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <Button
                      className={
                        user.isFlower
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                      }
                      onClick={() => handleFollowChange(user.id, user.isFlower)}
                    >
                      {user.isFlower ? <RiUserFollowLine /> : <RiUserUnfollowLine />}
                    </Button>
                    <Link href={`${linkTo.profile}/${user.id}`}>
                      <Button variant="secondary">
                        <Eye />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {followersCount > 0 && (
        <div>
          <div className="rounded-lg border border-indigo-400 bg-gradient-to-r from-indigo-600 to-pink-300 text-white p-4">
            <h2 className="flex items-center text-lg font-semibold">
              <FaUserFriends className="mr-2 text-xl" />
              Người theo dõi: {followersCount} người
            </h2>
          </div>
          <table className="mt-4 w-full">
            <tbody>
              {followers.map(user => (
                <tr key={user.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <td className="p-4 flex justify-center">
                    <Avatar>
                      <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.fullName} />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="p-4 font-semibold">
                    Họ và Tên: <span className="font-normal">{user.fullName}</span>
                  </td>
                  <td className="p-4 font-semibold">
                    Vai trò: <span className="font-normal">{user.roleName}</span>
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <Link href={`${linkTo.profile}/${user.id}`}>
                      <Button variant="secondary">
                        <Eye />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ShowLoading isPending={isPending} />
    </>
  );
}

export default FollowerPageClient;
