'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatMessage } from '@/types/ChatTypes';
import { UserType } from '@/types/UserType';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import clsx from 'clsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { httpPageApi } from '@/api-base';
import { ChatServiceIds } from '@/api-base/services/chat-services';
import { errorToast, successToast } from '@/lib/toastify';

function ChatPageClient({
  chatData,
  receiver,
  userId,
}: {
  chatData: ChatMessage[];
  receiver: UserType;
  userId: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(chatData);
  const [text, setText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchLatestMessages = useCallback(async () => {
    const res = await httpPageApi.execService({
      id: ChatServiceIds.GetChatMessages,
      params: { senderId: userId, receiverId: receiver.id },
    });
    if (res.ok && Array.isArray(res.data)) {
      setMessages(res.data);
    }
  }, [userId, receiver.id]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      fetchLatestMessages();
    }, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchLatestMessages]);

  const handleSend = async () => {
    if (!text.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        senderId: userId,
        receiverId: receiver.id,
        content: text,
        id: Math.random().toString(),
        createdOn: new Date().toISOString(),
        isRead: false,
      },
    ]);

    setText('');

    const res = await httpPageApi.execService(
      { id: ChatServiceIds.SendMessage },
      { isDeleted: false, senderId: userId, receiverId: receiver.id, content: text, isRead: false }
    );

    if (!res.ok) {
      errorToast(res.data?.message || 'Lỗi khi gửi tin nhắn');
      return;
    }

    successToast(res.data?.message || 'Gửi tin nhắn thành công');

    if (intervalRef.current) clearInterval(intervalRef.current);
    await fetchLatestMessages();
    intervalRef.current = setInterval(() => {
      fetchLatestMessages();
    }, 10000);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-250px)] flex flex-col border border-t shadow">
      <div className="flex items-center gap-3 p-4 border-b">
        <Avatar>
          <AvatarImage src={receiver.avatar || '/placeholder.svg'} alt={receiver.fullName} />
          <AvatarFallback>{receiver.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{receiver.fullName}</span>
      </div>
      <div className="h-[calc(100vh-8rem)] overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map(msg => {
          const isSender = msg.senderId === userId;
          return (
            <div key={msg.id} className={clsx('flex', isSender ? 'justify-end' : 'justify-start')}>
              <div
                className={clsx(
                  'px-4 py-2 rounded-2xl max-w-[70%]',
                  isSender ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'
                )}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>
      <form
        className="flex items-center gap-2 p-4 border-t"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div className="w-full">
          <Input placeholder="Nhập tin nhắn..." value={text} onChange={e => setText(e.target.value)} />
        </div>
        <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700" disabled={!text.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

export default ChatPageClient;
