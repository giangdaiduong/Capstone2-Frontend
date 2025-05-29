'use client';

import { useState, useTransition } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { httpPageApi } from '@/api-base';
import { UserServiceIds } from '@/api-base/services/user-services';
import { CloseAllToast, successToast } from '@/lib/toastify';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Vui lòng nhập mật khẩu cũ'),
    newPassword: z.string().min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự'),
    confirmPassword: z.string().min(8, 'Mật khẩu xác nhận phải có ít nhất 8 ký tự'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu mới và nhập lại mật khẩu không khớp',
    path: ['confirmPassword'],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordClient() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [clientError, setClientError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    setClientError('');
    CloseAllToast();

    if (isPending) return;

    startTransition(async () => {
      const res = await httpPageApi.execService(
        { id: UserServiceIds.ChangePassword },
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        }
      );

      if (!res.ok) {
        setClientError(res.data || 'Lỗi khi đổi mật khẩu');
        return;
      }

      successToast('Đổi mật khẩu thành công');
      reset(); // Reset form sau khi thành công
    });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Đổi mật khẩu</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Mật khẩu cũ */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-base font-medium">
                Mật khẩu cũ
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu cũ"
                  className="pr-10"
                  {...register('currentPassword')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">{showCurrentPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}</span>
                </Button>
              </div>
              {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
            </div>

            {/* Mật khẩu mới */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-base font-medium">
                Mật khẩu mới
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
                  className="pr-10"
                  {...register('newPassword')}
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
                  <span className="sr-only">{showNewPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}</span>
                </Button>
              </div>
              {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
            </div>

            {/* Nhập lại mật khẩu mới */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-base font-medium">
                Nhập lại mật khẩu mới
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu mới"
                  className="pr-10"
                  {...register('confirmPassword')}
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
                  <span className="sr-only">{showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}</span>
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            {/* Hiển thị lỗi từ server */}
            {clientError && <p className="text-red-500 text-sm">{clientError}</p>}

            {/* Nút Lưu */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
              disabled={isPending}
            >
              {isPending ? 'Đang xử lý...' : 'Lưu'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ShowLoading isPending={isPending} />
    </div>
  );
}
