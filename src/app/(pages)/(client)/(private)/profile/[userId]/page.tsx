import { httpServerApi } from '@/api-base';
import { UserServiceIds } from '@/api-base/services/user-services';

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

function ProfilePage() {
  return <div>ProfilePage</div>;
}

export default ProfilePage;
