'use client';

import { IdeaSuggestionType } from '@/types/IdeaTypes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import linkTo from '@/utils/linkTo';
import Link from 'next/link';
import { FaUser, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { MdScoreboard } from 'react-icons/md';
import { useState, useTransition } from 'react';
import { httpPageApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { errorToast, successToast } from '@/lib/toastify';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';

function ListIdeasPageClient({ ideas }: { ideas: IdeaSuggestionType[] }) {
  const [ratedIdeas, setRatedIdeas] = useState<Record<string, boolean>>({});
  const [hoveredRating, setHoveredRating] = useState<Record<string, number>>({});
  const [isPending, startTransition] = useTransition();

  const handleRate = (ideaId: string, rate: number) => {
    startTransition(async () => {
      const res = await httpPageApi.execService({ id: IdeaServiceIds.RateIdea }, { ideaId, rating: rate });

      if (!res.ok) {
        errorToast('Đánh giá thất bại');
        return;
      }

      successToast('Đánh giá thành công');
      setRatedIdeas(prev => ({
        ...prev,
        [ideaId]: true,
      }));
    });
  };

  const handleHover = (ideaId: string, rating: number) => {
    setHoveredRating(prev => ({
      ...prev,
      [ideaId]: rating,
    }));
  };

  return (
    <>
      {ideas.map(idea => (
        <Card key={idea.ideaId} className="overflow-hidden bg-white shadow-md border-l-4 border-[#1A2B88] p-4 gap-2">
          <div className="flex justify-between mb-2">
            <div className="flex flex-col gap-2">
              <Link href={`${linkTo.user.ideas.detail.replace('[ideaCode]', idea.ideaId)}`}>
                <h3 className="text-xl font-bold text-gray-800">{idea.title}</h3>
              </Link>
              <p className="text-sm text-gray-500 flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-2 font-semibold">
                  <FaUser className="inline" />
                  Người đăng: {idea.fullName}
                </span>
                <span>|</span>
                <span className="flex items-center gap-2 font-semibold">
                  <FaMapMarkerAlt className="inline" />
                  Khu vực: {idea.region}
                </span>
                <span>|</span>
                <span className="flex items-center gap-2 font-semibold">
                  <MdScoreboard className="inline" />
                  Số điểm: {idea.score}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end ">
              <Link href={`${linkTo.user.ideas.detail.replace('[ideaCode]', idea.ideaId)}`}>
                <Button className="bg-blue-500 hover:bg-blue-600">Xem chi tiết</Button>
              </Link>
              {!ratedIdeas[idea.ideaId] ? (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <Button
                      key={rating}
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto hover:bg-gray-100"
                      onMouseEnter={() => handleHover(idea.ideaId, rating)}
                      onMouseLeave={() => handleHover(idea.ideaId, 0)}
                      onClick={() => handleRate(idea.ideaId, rating)}
                    >
                      <FaStar
                        className={`text-xl transition-colors ${
                          (hoveredRating[idea.ideaId] || 0) >= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                  <FaStar className="text-yellow-400" />
                  <span>Đã đánh giá</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
      <ShowLoading isPending={isPending} />
    </>
  );
}

export default ListIdeasPageClient;
