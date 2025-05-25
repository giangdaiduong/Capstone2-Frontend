export type ChatMessage = {
  id: string;
  content: string;
  createdOn: string;
  senderId: string;
  receiverId: string;
  isRead: boolean;
};
