import { httpServerApi } from '@/api-base';
import { ChatServiceIds } from '@/api-base/services/chat-services';
import { UserServiceIds } from '@/api-base/services/user-services';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { authOptions } from '@/lib/auth';
import { AlertCircle } from 'lucide-react';
import { getServerSession } from 'next-auth';
import ChatPageClient from './page-client';

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
      title: `Chat với ${userId}`,
    };
  }

  return {
    title: `Chat với ${userRes.data.fullName}`,
  };
}

async function ChatPage({ params }: { params: Params }) {
  const { userId: receiverId } = await params;
  const session = await getServerSession(authOptions);
  const senderId = session?.user.id;

  const userRes = await (
    await httpServerApi()
  ).execService({
    id: UserServiceIds.GetUserById,
    params: { id: receiverId },
  });

  if (!senderId || !receiverId || !userRes.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Người dùng hoặc đoạn chat không tồn tại!</AlertTitle>
      </Alert>
    );
  }

  const user = userRes.data;

  const res = await (
    await httpServerApi()
  ).execService({
    id: ChatServiceIds.GetChatMessages,
    params: { senderId, receiverId },
  });

  if (!res.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy tin nhắn!</AlertTitle>
      </Alert>
    );
  }

  console.log(res.data);

  return <ChatPageClient chatData={res.data} receiver={user} userId={senderId} />;
}

export default ChatPage;
