import { Metadata } from 'next';
import { httpServerApi } from '@/api-base';
import { FollowServiceIds } from '@/api-base/services/follow-services';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { UserType } from '@/types/UserType';
import FollowerPageClient from './page-client';

export const metadata: Metadata = {
  title: 'Người theo dõi',
};

async function FlowerPage() {
  const countRes = await (await httpServerApi()).execService({ id: FollowServiceIds.GetCountFolow });
  const followerRes = await (await httpServerApi()).execService({ id: FollowServiceIds.GetFollower });
  const followingRes = await (await httpServerApi()).execService({ id: FollowServiceIds.GetFollowing });

  if (!countRes.ok || !followerRes.ok || !followingRes.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy danh sách người theo dõi!</AlertTitle>
      </Alert>
    );
  }

  const { followersCount, followingCount } = countRes.data;

  if (followersCount == 0 && followingCount == 0) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Bạn chưa có ai theo dõi!</AlertTitle>
      </Alert>
    );
  }

  const followers = followerRes.data as UserType[];
  const following = followingRes.data as UserType[];

  return (
    <div className="mx-auto space-y-6">
      <FollowerPageClient
        followersCount={followersCount}
        followingCount={followingCount}
        followers={followers}
        following={following}
      />
    </div>
  );
}

export default FlowerPage;
