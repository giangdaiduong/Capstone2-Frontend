'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IdeaCommentType, IdeaType } from '@/types/IdeaTypes';
import { useEffect, useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { httpPageApi } from '@/api-base';
import { CommentServiceIds } from '@/api-base/services/comment-services';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { useSession } from 'next-auth/react';
import { successToast, errorToast } from '@/lib/toastify';
import { IoSend, IoClose } from 'react-icons/io5';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

export default function IdeasDetailPageClient({ idea }: { idea: IdeaType }) {
  const [comment, setComment] = useState('');
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const [comments, setComments] = useState<IdeaCommentType[]>(idea.comments || []);
  const router = useRouter();

  useEffect(() => {
    setComments(idea.comments || []);
  }, [idea.comments]);

  const handleSubmitComment = () => {
    if (comment.trim() === '') {
      return;
    }

    startTransition(async () => {
      const res = await httpPageApi.execService(
        { id: CommentServiceIds.SendComment },
        {
          content: comment,
          ideaId: idea.id,
          userId: session?.user?.id,
          parendCommentId: idea.id,
        }
      );

      if (!res.ok) {
        errorToast(res.data?.message || 'Lỗi khi gửi bình luận');
        return;
      }

      successToast(res.data?.message || 'Gửi bình luận thành công');
      setComment('');
      router.refresh();
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bình luận</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Để lại bình luận"
          className="resize-none"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <div className="flex justify-end my-2">
          <Button onClick={handleSubmitComment}>
            Gửi bình luận
            <IoSend />
          </Button>
        </div>
        <Separator className="my-4" />
        {comments.length > 0 && (
          <div className="flex flex-col gap-2">
            {comments.map(cmt => {
              return (
                <CommentItem
                  key={cmt.id}
                  comment={cmt}
                  canReply={true}
                  userId={session?.user?.id || ''}
                  ideaId={idea.id}
                />
              );
            })}
          </div>
        )}
      </CardContent>
      <ShowLoading isPending={isPending} />
    </Card>
  );
}

const CommentItem = ({
  comment,
  canReply = false,
  userId,
  ideaId,
}: {
  comment: IdeaCommentType;
  canReply: boolean;
  userId: string;
  ideaId: string;
}) => {
  const [isReply, setIsReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmitReplyComment = () => {
    if (replyContent.trim() === '') {
      return;
    }

    startTransition(async () => {
      const res = await httpPageApi.execService(
        { id: CommentServiceIds.ReplyComment },
        {
          content: replyContent,
          ideaId: ideaId,
          userId: userId,
          parendCommentId: comment.id,
        }
      );

      if (!res.ok) {
        errorToast(res.data?.message || 'Lỗi khi reply bình luận');
        return;
      }

      successToast(res.data?.message || 'Gửi reply bình luận thành công');
      setReplyContent('');
      setIsReply(false);
      router.refresh();
    });
  };

  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarFallback>{comment.user?.charAt(0) || 'A'}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <div className="font-bold p-1">{comment.user || 'Ẩn danh'}</div>
        <div className="text-sm px-2 py-4 rounded-md bg-gray-100">{comment.content}</div>
        {comment.replies && (
          <div className="my-2 flex flex-col gap-2">
            {comment.replies.map(cmt => (
              <CommentItem key={cmt.id} comment={cmt} canReply={false} userId={userId} ideaId={ideaId} />
            ))}
          </div>
        )}
        {canReply && !isReply && (
          <div className="flex justify-end">
            <Button variant={'outline'} onClick={() => setIsReply(true)}>
              Phản hồi
            </Button>
          </div>
        )}
        {isReply && (
          <div className="m-2 flex flex-col gap-2">
            <Textarea
              placeholder="Phản hồi"
              className="resize-none"
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant={'outline'} onClick={() => setIsReply(false)}>
                <IoClose />
                Hủy
              </Button>
              <Button onClick={handleSubmitReplyComment}>
                Gửi
                <IoSend />
              </Button>
            </div>
          </div>
        )}
      </div>
      <ShowLoading isPending={isPending} />
    </div>
  );
};
