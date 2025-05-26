import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum ChatServiceIds {
  GetChatMessages = 'chat.getChatMessages',
  SendMessage = 'chat.sendMessage',
  GetChatList = 'chat.getChatList',
}

export default [
  {
    id: ChatServiceIds.SendMessage,
    url: 'v1/api/client/Chat',
    method: MethodAPI.post,
    version: 1,
  },
  {
    id: ChatServiceIds.GetChatMessages,
    url: 'v1/api/client/Chat/{receiverId}',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: ChatServiceIds.GetChatList,
    url: 'v1/api/client/Chat/list-chat',
    method: MethodAPI.get,
    version: 1,
  },
] as ServiceApi[];
