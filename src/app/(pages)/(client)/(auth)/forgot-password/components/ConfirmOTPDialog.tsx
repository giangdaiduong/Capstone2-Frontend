'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserServiceIds } from '@/api-base/services/user-services';
import { httpPageApi } from '@/api-base';
import { successToast } from '@/lib/toastify';
import { useRouter } from 'next/navigation';
import linkTo from '@/utils/linkTo';

const resetPasswordSchema = z
  .object({
    otp: z.string().min(6, 'OTP phải có 6 ký tự').max(6, 'OTP phải có 6 ký tự'),
    newPassword: z.string().min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự'),
    confirmPassword: z.string().min(8, 'Mật khẩu xác nhận phải có ít nhất 8 ký tự'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu mới và nhập lại mật khẩu không khớp',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ConfirmOTPDialog({
  showDialog,
  handleDialogClose,
  userEmail,
}: {
  showDialog: boolean;
  handleDialogClose: () => void;
  userEmail: string;
}) {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPendingReset, startResetTransition] = useTransition();
  const [resetError, setResetError] = useState('');

  const resetForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    setResetError('');

    if (isPendingReset) return;

    startResetTransition(async () => {
      try {
        const res = await httpPageApi.execService({
          id: UserServiceIds.ResetPassword,
          params: { otp: data.otp, newPassword: data.newPassword, email: userEmail },
        });

        if (!res.ok) {
          setResetError(res.data || 'Lỗi khi đặt lại mật khẩu');
          return;
        }

        successToast(res.data?.message || 'Mật khẩu đã được đặt lại thành công');

        handleDialogClose();
        router.push(linkTo.login);
      } catch (error) {
        console.log(error);

        setResetError('Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.');
      }
    });
  };

  return (
    <Dialog open={showDialog} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Xác thực và đặt lại mật khẩu</DialogTitle>
          <DialogDescription>
            Mã OTP đã được gửi đến email: <strong>{userEmail}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={resetForm.handleSubmit(onSubmit)} className="space-y-4">
          {/* OTP Input */}
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm font-medium">
              Mã OTP
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="Nhập mã OTP 6 số"
              maxLength={6}
              className="text-center text-lg tracking-widest"
              {...resetForm.register('otp')}
            />
            {resetForm.formState.errors.otp && (
              <p className="text-red-500 text-sm">{resetForm.formState.errors.otp.message}</p>
            )}
          </div>

          {/* Mật khẩu mới */}
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-sm font-medium">
              Mật khẩu mới
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
                className="pr-10"
                {...resetForm.register('newPassword')}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
            {resetForm.formState.errors.newPassword && (
              <p className="text-red-500 text-sm">{resetForm.formState.errors.newPassword.message}</p>
            )}
          </div>

          {/* Xác nhận mật khẩu */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Nhập lại mật khẩu mới
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu mới"
                className="pr-10"
                {...resetForm.register('confirmPassword')}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
            {resetForm.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm">{resetForm.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          {resetError && <p className="text-red-500 text-sm">{resetError}</p>}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleDialogClose}
              disabled={isPendingReset}
            >
              Hủy
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={isPendingReset}>
              {isPendingReset ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmOTPDialog;
