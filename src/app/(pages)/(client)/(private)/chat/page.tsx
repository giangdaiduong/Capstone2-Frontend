import { httpServerApi } from '@/api-base';
import { ChatServiceIds } from '@/api-base/services/chat-services';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserType } from '@/types/UserType';
import linkTo from '@/utils/linkTo';
import { AlertCircle } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Danh sách Chat',
};

async function ChatListPage() {
  const res = await (await httpServerApi()).execService({ id: ChatServiceIds.GetChatList });

  if (!res.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy danh sách chat!</AlertTitle>
      </Alert>
    );
  }

  const chatList = res.data as UserType[];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Danh sách người dùng theo dõi</h1>
      </div>
      {chatList.map(user => (
        <Link key={user.id} href={`${linkTo.chat}/${user.id}`} className="flex gap-4 justify-start items-center">
          <Avatar>
            <AvatarImage src={user.avatar || '/user.webp'} />
            <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p>{user.fullName}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChatListPage;
