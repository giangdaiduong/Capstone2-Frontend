'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IdeaType } from '@/types/IdeaTypes';
import { formatDate } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { FaCalendarAlt, FaTag, FaUser } from 'react-icons/fa';
import { FaHashtag } from 'react-icons/fa6';
import ScoringDialog from './ScoringDialog';

function ReviewIdeaDialog({ idea, onClose }: { idea: IdeaType; onClose: () => void }) {
  const [isScoringDialogOpen, setIsScoringDialogOpen] = useState(false);

  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-2xl"
        onEscapeKeyDown={e => {
          e.preventDefault();
        }}
        onPointerDownOutside={e => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="relative p-2">
          <Button onClick={onClose} className="absolute left-0 top-0 bg-blue-600 hover:bg-blue-700 text-white">
            <ArrowLeft />
          </Button>

          <DialogTitle className="px-6 space-y-4">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center  px-6">
                <div className="font-bold text-blue-700">
                  <BiCategory className="inline mr-1" />
                  {idea.category}
                </div>
                <div className="font-bold text-red-600">
                  <FaTag className="inline mr-1" />
                  {idea.isForSale ? 'Bán ý tưởng' : 'Không bán ý tưởng'}
                </div>
              </div>
              <div className="">
                {/* {idea.copyrightStatus ? (
                  <span className={`px-3 py-1 text-sm font-medium rounded-md bg-green-100 text-green-600`}>
                    Đã đăng ký bản quyền
                  </span>
                ) : (
                  <span className={`px-3 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-600`}>
                    Chưa đăng ký bản quyền
                  </span>
                )} */}
              </div>
            </div>
            <div className="text-2xl text-center font-bold text-blue-800">{idea.title}</div>
          </DialogTitle>
          <div className="p-4">
            <div className="flex gap-2">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 ml-2">
                <span className="flex items-center">
                  <FaHashtag className="inline mr-1 text-blue-800" />
                  <strong>Mã: </strong> {idea.ideaCode}
                </span>
                <span className="flex items-center">
                  <FaUser className="inline mr-1 text-blue-800" />
                  <strong>Tác giả: </strong> {idea.initiator || 'Ẩn danh'}
                </span>
                <span className="flex items-center">
                  <FaCalendarAlt className="inline mr-1 text-blue-800" /> <strong>Ngày đăng: </strong>
                  {formatDate(idea.createdOn, 'dd/MM/yyyy')}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>
        <Separator />
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-500px)]">
          <div className="text-xl font-bold text-blue-800">Nội dung ý tưởng:</div>
          <div className="text-md whitespace-pre-line">{idea.description}</div>
          <div>
            <h4 className="text-lg font-bold">Hình ảnh minh hoạ</h4>
            <Image src={idea.imageUrls} alt={idea.title} width={500} height={500} />
          </div>
        </div>
        {idea.copyrightStatus && idea.copyrightCertificate && (
          <>
            <Separator />
            <div className="p-4">
              <div className="text-xl font-bold text-blue-800">Đã đăng ký bản quyền</div>
              <Image src={idea.copyrightCertificate} alt={idea.title} width={500} height={500} />
            </div>
          </>
        )}
        <Separator />
        <div className="p-4 flex justify-around">
          <Button variant="secondary">Liên hệ tác giả</Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsScoringDialogOpen(true)}
            disabled={idea.isApproved}
          >
            Chấm điểm
          </Button>
        </div>
      </DialogContent>
      {isScoringDialogOpen && (
        <ScoringDialog
          ideaId={idea.id}
          onClose={() => {
            setIsScoringDialogOpen(false);
          }}
          onSuccess={() => {
            setIsScoringDialogOpen(false);
            onClose();
          }}
        />
      )}
    </Dialog>
  );
}

export default ReviewIdeaDialog;
