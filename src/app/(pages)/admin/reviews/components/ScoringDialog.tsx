'use client';

import { httpPageApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { CloseAllToast, errorToast, successToast } from '@/lib/toastify';
import { ArrowRight } from 'lucide-react';
import { useState, useCallback, useMemo, useTransition } from 'react';

const CRITERIA: { id: number; label: string; point: number }[] = [
  { id: 1, label: 'Tiêu đề (Ngắn gọn, rõ ràng, phản ánh nội dung)', point: 1 },
  { id: 2, label: 'Tóm tắt ý tưởng (Có đoạn mô tả tổng quan, dễ hiểu)', point: 1 },
  { id: 3, label: 'Nội dung chi tiết (Trình bày logic, có tính mới, khả thi)', point: 1 },
  { id: 4, label: 'Lĩnh vực phù hợp (Gắn đúng lĩnh vực ngành nghề liên quan)', point: 1 },
  { id: 5, label: 'File đính kèm (Có hình ảnh, tài liệu thuyết minh)', point: 1 },
  { id: 6, label: 'Giấy chứng nhận bản quyền (Có giấy tờ chứng minh quyền sở hữu trí tuệ)', point: 1 },
  { id: 7, label: 'Không vi phạm nội dung cấm (Không vi phạm đạo đức, pháp luật)', point: 1 },
  { id: 8, label: 'Định dạng chuẩn (Đảm bảo đúng yêu cầu trình bày)', point: 1 },
  { id: 9, label: 'Các giấy tờ liên quan khác (Có các giấy tờ khác liên quan đến ý tưởng)', point: 1 },
];

type ScoreState = {
  [id: number]: boolean;
};

function ScoringDialog({ ideaId, onClose, onSuccess }: { ideaId: string; onClose: () => void; onSuccess: () => void }) {
  const [checked, setChecked] = useState<ScoreState>({});
  const [isPending, startTransition] = useTransition();

  const totalScore = useMemo(
    () => CRITERIA.reduce((sum, cri) => sum + (checked[cri.id] ? cri.point : 0), 0),
    [checked]
  );

  const toggleCheck = useCallback((id: number) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleSubmit = useCallback(() => {
    CloseAllToast();
    startTransition(async () => {
      const res = await httpPageApi.execService({ id: IdeaServiceIds.ApproveIdea, params: { ideaId } });
      if (!res.ok) {
        errorToast(res.data?.message || 'Lỗi khi duyệt ý tưởng!');
        return;
      }
      successToast(res.data?.message || 'Duyệt ý tưởng thành công!');
      onSuccess();
    });
  }, [ideaId, onSuccess]);

  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-2xl">Chấm điểm và xét duyệt đăng bài ý tưởng</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="p-4 space-y-4">
          <div className="text-xl font-bold text-blue-800">Tiêu chí</div>
          <div className="flex flex-col gap-2">
            {CRITERIA.map(cri => (
              <div key={cri.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`criteria-${cri.id}`}
                    checked={!!checked[cri.id]}
                    onCheckedChange={() => toggleCheck(cri.id)}
                    aria-label={cri.label}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label htmlFor={`criteria-${cri.id}`} className="text-md cursor-pointer">
                    {cri.label}
                  </label>
                </div>
                <div className="text-md text-red-600 whitespace-nowrap">{`(+${cri.point} điểm)`}</div>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="p-4">
          <div className="flex items-center gap-1 font-bold">
            Tổng điểm: 7 - 10 điểm <ArrowRight className="w-4 h-4" /> có thể duyệt
          </div>
          <ul className="list-disc list-inside ml-2">
            <li>&lt; 5 điểm: Không được duyệt</li>
            <li>5 - 6 điểm: Cần chỉnh sửa trước khi duyệt</li>
            <li>&ge; 7 điểm: Có thể duyệt</li>
          </ul>
          <div className="text-xl font-bold text-blue-800 my-2">Tổng điểm: {totalScore}</div>
        </div>
        <Separator />
        <div className="p-4 flex justify-around">
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit} disabled={totalScore < 7}>
            Duyệt
          </Button>
        </div>
      </DialogContent>
      <ShowLoading isPending={isPending} />
    </Dialog>
  );
}

export default ScoringDialog;
