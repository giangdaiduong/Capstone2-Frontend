'use client';

import { httpPageApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IdeaCommentType, IdeaType } from '@/types/IdeaTypes';
import linkTo from '@/utils/linkTo';
import { formatDate } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { errorToast, successToast } from '@/lib/toastify';
import { Separator } from '@/components/ui/separator';
import { CommentServiceIds } from '@/api-base/services/comment-services';
import { useSession } from 'next-auth/react';
import { CommentItem } from '@/app/(pages)/(client)/(private)/user/ideas/[ideaCode]/page-client';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { IoSend } from 'react-icons/io5';

function IdeaDetailDialog({ ideaId, onClose }: { ideaId: string; onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [comment, setComment] = useState('');
  const [idea, setIdea] = useState<IdeaType>({} as IdeaType);
  const [comments, setComments] = useState<(IdeaCommentType & { isReply?: boolean })[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    startTransition(async () => {
      const res = await httpPageApi.execService({
        id: IdeaServiceIds.GetIdeaById,
        params: { ideaId: ideaId },
      });

      if (!res.ok) {
        errorToast(res.data?.message || 'Lỗi khi lấy ý tưởng');
        onClose();
        return;
      }

      setIdea(res.data);
      setComments(res.data.comments.map((cmt: IdeaCommentType) => ({ ...cmt, isReply: true })) || []);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ideaId]);

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
      setComments([
        {
          id: new Date().getTime().toString(),
          content: comment,
          user: session?.user?.fullName,
          isReply: false,
        } as IdeaCommentType,
        ...comments,
      ]);
      setComment('');
    });
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[calc(100vh-100px)] overflow-y-auto mx-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{idea.initiator?.charAt(0) || ''}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Link href={`${linkTo.profile}/${idea.createdBy}`}>
                  <DialogTitle className="font-bold text-xl truncate">{idea.initiator}</DialogTitle>
                </Link>
                <p className="px-1 text-sm text-gray-500">{formatDate(idea.createdOn || new Date(), 'dd/MM/yyyy')}</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-4">
          <div className="whitespace-pre-line">{idea.description}</div>
          <div className="flex justify-center items-center p-2">
            <Image src={idea.imageUrls || '/logo.png'} alt={idea.title || ''} width={500} height={500} />
          </div>
        </div>
        <Separator />
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
        <Separator />
        {comments.length > 0 && (
          <div className="flex flex-col gap-2">
            {comments.map(cmt => {
              return (
                <CommentItem
                  key={cmt.id}
                  comment={cmt}
                  canReply={cmt.isReply || false}
                  userId={session?.user?.id || ''}
                  ideaId={idea.id}
                />
              );
            })}
          </div>
        )}
      </DialogContent>
      <ShowLoading isPending={isPending} />
    </Dialog>
  );
}

export default IdeaDetailDialog;
