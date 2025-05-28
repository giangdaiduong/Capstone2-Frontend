'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IdeaType } from '@/types/IdeaTypes';
import { formatDate } from 'date-fns';
import Link from 'next/link';
import { AiFillLike } from 'react-icons/ai';
import { FaComments, FaStar } from 'react-icons/fa';
import linkTo from '@/utils/linkTo';
import { getStageStyle, IdeaStage } from '@/utils/constants';
import { useState } from 'react';
import MatchInvestorsDialog from './MatchInvestorsDialog';

function IdeaCard({ idea }: { idea: IdeaType }) {
  const [openMatchInvestorsDialog, setOpenMatchInvestorsDialog] = useState(false);

  return (
    <Card className="overflow-hidden bg-white shadow-md border-l-4 border-[#1A2B88] p-4 gap-2">
      <div className="flex justify-between mb-2">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-gray-800">{idea.title}</h3>
          <p className="text-sm text-gray-500">
            <Link href={`${linkTo.profile}/${idea.createdBy}`}>{idea.initiator}</Link> - Ngày đăng:{' '}
            {formatDate(idea.createdOn, 'dd/MM/yyyy')} | <span className="italic">Lĩnh vực: {idea.category}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 items-end ">
          {idea.copyrightStatus ? (
            <span className={`px-3 py-1 text-sm font-medium rounded-md bg-green-100 text-green-600`}>
              Đã đăng ký bản quyền
            </span>
          ) : (
            <span className={`px-3 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-600`}>
              Chưa đăng ký bản quyền
            </span>
          )}

          <span className={`px-3 py-1 text-sm font-medium rounded-md h-fit text-center ${getStageStyle(idea.stage)}`}>
            {IdeaStage.find(stage => stage.key === idea.stage)?.value || 'Chưa xác định'}
          </span>
        </div>
      </div>
      <div className="text-gray-600 mb-3">
        <strong>Tóm tắt ý tưởng</strong>:<div className="whitespace-pre-line">{idea.description}</div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex flex-col md:flex-row gap-4">
          <span className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md h-fit bg-blue-800 text-white">
            <AiFillLike />
            {idea.totalLikes} Lượt thích
          </span>
          <span className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md h-fit bg-gray-500 text-white">
            <FaComments /> {idea.totalComments} Bình luận
          </span>
          <span className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md h-fit text-yellow-500">
            <FaStar /> {idea.totalRatings} Điểm đánh giá
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setOpenMatchInvestorsDialog(true)}>
            Tìm nhà đầu tư
          </Button>
          <Link
            href={{
              pathname: linkTo.user.ideas.detail.replace('[ideaCode]', idea.id),
              query: { from: 'ideas' },
            }}
            className="cursor-pointer"
          >
            <Button variant={'outline'}>Xem chi tiết</Button>
          </Link>
          <Link href={linkTo.user.ideas.edit.replace('[ideaCode]', idea.id)}>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">Chỉnh sửa</Button>
          </Link>
        </div>
      </div>
      {openMatchInvestorsDialog && (
        <MatchInvestorsDialog ideaId={idea.id} onClose={() => setOpenMatchInvestorsDialog(false)} />
      )}
    </Card>
  );
}

export default IdeaCard;
