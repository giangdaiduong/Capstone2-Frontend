import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danh sách Chat',
};

async function ChatListPage() {
  // const res = await (await httpServerApi()).execService({ id: '' });

  return <div>ChatListPage</div>;
}

export default ChatListPage;
