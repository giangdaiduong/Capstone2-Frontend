import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserType } from '@/types/UserType';
import linkTo from '@/utils/linkTo';
import clsx from 'clsx';
import Link from 'next/link';

function ChatLayout({
  children,
  chatList,
  selectedUserId,
}: {
  children: React.ReactNode;
  chatList: UserType[];
  selectedUserId?: string;
}) {
  return (
    <div className="flex w-full h-[calc(100vh-250px)] border border-t shadow">
      <div className="w-2xs border-r bg-gray-50">
        <div className="p-4 border-b bg-white h-16">
          <h2 className="text-xl font-bold">Đoạn chat</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-250px-4rem)]">
          {chatList.map(user => (
            <Link
              key={user.id}
              href={`${linkTo.chat}/${user.id}`}
              className={clsx(
                'flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition-colors',
                selectedUserId === user.id && 'bg-blue-50 border-r-2 border-blue-500'
              )}
            >
              <Avatar>
                <AvatarImage src={user.avatar || '/user.webp'} alt={user.fullName} />
                <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.fullName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

export default ChatLayout;
