import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum CommentServiceIds {
  SendComment = 'comment.sendComment',
  ReplyComment = 'comment.replyComment',
  DeleteComment = 'comment.deleteComment',
  UpdateComment = 'comment.updateComment',
}

export default [
  {
    id: CommentServiceIds.SendComment,
    url: 'api/Comments',
    method: MethodAPI.post,
    version: 1,
  },
  {
    id: CommentServiceIds.ReplyComment,
    url: 'api/Comments/reply',
    method: MethodAPI.post,
    version: 1,
  },
  {
    id: CommentServiceIds.DeleteComment,
    url: 'api/Comments/{commentId}',
    method: MethodAPI.delete,
    version: 1,
  },
  {
    id: CommentServiceIds.UpdateComment,
    url: 'api/Comments/{commentId}',
    method: MethodAPI.patch,
    version: 1,
  },
] as ServiceApi[];
