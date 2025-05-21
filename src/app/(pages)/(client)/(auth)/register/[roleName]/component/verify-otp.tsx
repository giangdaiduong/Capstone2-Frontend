import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { httpPageApi } from '@/api-base';
import { AuthServiceIds } from '@/api-base/services/auth-services';
import { errorToast, successToast } from '@/lib/toastify';
import { useRouter } from 'next/navigation';
import linkTo from '@/utils/linkTo';

const VerifyOtp = ({ email, onClose }: { email: string; onClose: () => void }) => {
  const [otp, setOtp] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleVerifyOtp = () => {
    startTransition(async () => {
      const res = await httpPageApi.execService(
        { id: AuthServiceIds.VerifyOtp },
        {
          email,
          otp,
        }
      );

      if (!res.ok) {
        errorToast(res.data.message);
        return;
      }

      successToast(res.data.message);
      onClose();
      router.push(linkTo.login);
    });
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-xl"
        onEscapeKeyDown={e => {
          e.preventDefault();
        }}
        onPointerDownOutside={e => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Nhập mã OTP</DialogTitle>
          <DialogDescription>Nhập mã OTP đã được gửi đến email {email}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input id="otp" type="number" value={otp} onChange={e => setOtp(e.target.value)} />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild onClick={onClose}>
            <Button type="button" variant="secondary">
              Đóng
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleVerifyOtp}>
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
      <ShowLoading isPending={isPending} />
    </Dialog>
  );
};

export default VerifyOtp;
