'use client';

import { httpPageApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { errorToast } from '@/lib/toastify';
import { IdeaStage, getStageStyle } from '@/utils/constants';
import { InvestorType } from '@/types/IdeaTypes';
import linkTo from '@/utils/linkTo';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';

function MatchInvestorsDialog({ ideaId, onClose }: { ideaId: string; onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [investors, setInvestors] = useState<InvestorType[]>([]);

  useEffect(() => {
    startTransition(async () => {
      const res = await httpPageApi.execService({ id: IdeaServiceIds.GetInvestorMatchIdeas, params: { ideaId } });

      if (!res.ok) {
        errorToast('Lỗi khi tìm kiếm nhà đầu tư');
        return;
      }

      setInvestors(res.data);
    });
  }, [ideaId]);

  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[calc(100vh-100px)] overflow-y-auto mx-auto">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl truncate text-center">
            Danh sách nhà đầu tư có thể tương hợp
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="p-4 space-y-6">
          {investors.map(investor => (
            <Card
              key={investor.investor.id}
              className="overflow-hidden bg-white shadow-md border-l-4 border-[#1A2B88] p-4 gap-2"
            >
              <div className="flex justify-between mb-2">
                <div className="flex flex-col gap-2">
                  <Link href={`${linkTo.profile.replace('[userId]', investor.investor.id)}`}>
                    <h3 className="text-xl font-bold text-gray-800">{investor.investor.fullName}</h3>
                  </Link>
                  <p className="text-md text-gray-500">
                    Email:{' '}
                    <Link href={`mailto:${investor.investor.email}`} className="font-bold hover:underline">
                      <i>{investor.investor.email}</i>
                    </Link>
                  </p>
                  <p className="text-sm text-gray-500">
                    Khu vực: <span className="font-bold">{investor.investor.preferredRegions}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Ngành nghề quan tâm: <span className="font-bold">{investor.investor.preferredIndustries}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <p className="text-sm text-gray-500">
                    Giai đoạn ưu tiên:{' '}
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-md h-fit text-center ${getStageStyle(
                        investor.investor.preferredStages
                      )}`}
                    >
                      {IdeaStage.find(stage => stage.key === investor.investor.preferredStages)?.value ||
                        'Chưa xác định'}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Điểm: <span className="font-bold">{investor.score}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Đầu tư tối thiểu: <span className="font-bold">{investor.investor.fundingRangeMin}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Đầu tư tối đa: <span className="font-bold">{investor.investor.fundingRangeMax}</span>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
      <ShowLoading isPending={isPending} />
    </Dialog>
  );
}

export default MatchInvestorsDialog;
