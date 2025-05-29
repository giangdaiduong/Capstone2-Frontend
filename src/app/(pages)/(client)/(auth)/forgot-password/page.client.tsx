'use client';

import { httpPageApi } from '@/api-base';
import { UserServiceIds } from '@/api-base/services/user-services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { successToast } from '@/lib/toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ConfirmOTPDialog from './components/ConfirmOTPDialog';

const emailSchema = z.object({
  email: z.string().email('Vui lòng nhập email hợp lệ').min(1, 'Vui lòng nhập email'),
});

type EmailFormData = z.infer<typeof emailSchema>;

function ForgotPasswordClient() {
  const [showDialog, setShowDialog] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isPendingEmail, startEmailTransition] = useTransition();
  const [emailError, setEmailError] = useState('');

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onEmailSubmit = (data: EmailFormData) => {
    setEmailError('');

    if (isPendingEmail) return;

    startEmailTransition(async () => {
      try {
        const res = await httpPageApi.execService({ id: UserServiceIds.ForgotPassword, params: { email: data.email } });

        if (!res.ok) {
          setEmailError(res.data?.message || 'Lỗi khi gửi OTP');
          return;
        }

        successToast(res.data?.message || 'Mã xác thực đã được gửi đến email của bạn');

        setUserEmail(data.email);
        setShowDialog(true);
      } catch (error) {
        console.log(error);

        setEmailError('Có lỗi xảy ra khi gửi OTP. Vui lòng thử lại.');
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Quên mật khẩu</CardTitle>
          <p className="text-center text-gray-600">Nhập email của bạn để nhận mã xác thực</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  className="pl-10"
                  {...emailForm.register('email')}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              {emailForm.formState.errors.email && (
                <p className="text-red-500 text-sm">{emailForm.formState.errors.email.message}</p>
              )}
            </div>

            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
              disabled={isPendingEmail}
            >
              {isPendingEmail ? 'Đang gửi...' : 'Gửi mã xác thực'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <ConfirmOTPDialog showDialog={showDialog} handleDialogClose={() => setShowDialog(false)} userEmail={userEmail} />
    </div>
  );
}

export default ForgotPasswordClient;
