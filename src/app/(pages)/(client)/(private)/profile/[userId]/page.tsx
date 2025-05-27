import { httpServerApi } from '@/api-base';
import { FollowServiceIds } from '@/api-base/services/follow-services';
import { UserServiceIds } from '@/api-base/services/user-services';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { UserType } from '@/types/UserType';
import { formatDate } from 'date-fns';
import { AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { FaUserFriends } from 'react-icons/fa';
import ActionButtonProfile from './components/ActionButtonProfile';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { IdeaType } from '@/types/IdeaTypes';
import IdeaPublicCard from './components/IdeaPublicCard';

type Params = Promise<{ userId: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { userId } = await params;

  const userRes = await (
    await httpServerApi()
  ).execService({
    id: UserServiceIds.GetUserById,
    params: { id: userId },
  });

  if (!userRes.ok) {
    return {
      title: `Thông tin người dùng: ${userId}`,
    };
  }

  return {
    title: `Thông tin người dùng: ${userRes.data.fullName}`,
  };
}

async function ProfilePage({ params }: { params: Params }) {
  const { userId } = await params;

  const userRes = await (
    await httpServerApi()
  ).execService({
    id: UserServiceIds.GetUserById,
    params: { id: userId },
  });

  const countRes = await (await httpServerApi()).execService({ id: FollowServiceIds.GetCountFolow });
  const isFollowRes = await (
    await httpServerApi()
  ).execService({
    id: FollowServiceIds.IsFollow,
    params: { userId },
  });
  const ideaRes = await (await httpServerApi()).execService({ id: IdeaServiceIds.GetIdeaByUserId }, { userId });

  if (!userRes.ok || !countRes.ok || !isFollowRes.ok || !ideaRes.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy thông tin người dùng!</AlertTitle>
      </Alert>
    );
  }

  const user = userRes.data as UserType;
  const ideas = ideaRes.data as IdeaType[];

  console.log(ideas);

  return (
    <div className="mx-auto space-y-6">
      {/* Thông tin cá nhân */}
      <div className="rounded-lg border border-indigo-300 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-pink-100 text-white p-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Thông tin cá nhân</h1>
            <div className="flex items-center gap-2 text-blue-800">
              <FaUserFriends className="mr-2 text-xl" /> {countRes.data.followersCount} người theo dõi
            </div>
          </div>
        </div>

        <div className="p-4 flex gap-4 items-center">
          <div className="w-1/4 p-4">
            <Image src={user.avatar || '/user.webp'} alt={user.fullName} width={200} height={200} />
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-md">
            <div>
              <strong>Họ và Tên:</strong> {user.fullName}
            </div>
            <div>
              <strong>Số điện thoại:</strong> {user.phone}
            </div>
            <div>
              <strong>Vai trò:</strong> {user.roleName}
            </div>
            <div>
              <strong>Địa chỉ:</strong> {user.address}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Ngày sinh:</strong> {user.birthday && formatDate(user.birthday, 'dd/MM/yyyy')}
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-end gap-2">
          <ActionButtonProfile user={user} flower={isFollowRes.data.isFollowing} />
        </div>
      </div>

      {/* ý tưởng của người dùng */}
      <div className="rounded-lg border border-indigo-300 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-pink-100 text-white p-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Danh sách ý tưởng</h1>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4 items-center">
          {ideas.map(idea => (
            <IdeaPublicCard key={idea.ideaCode} idea={idea} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
