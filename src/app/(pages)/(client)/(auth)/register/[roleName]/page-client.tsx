'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { RoleType } from '@/types/RoleTypes';
import { EyeOff, Eye, CalendarIcon } from 'lucide-react';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FaUnlock, FaLock, FaUser, FaUserAstronaut, FaIdCard, FaPhone, FaHouseMedical } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn, fileToBase64 } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { ImageUploader } from '@/components/ui/image-uploader';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { httpPageApi } from '@/api-base';
import { AuthServiceIds } from '@/api-base/services/auth-services';
import { CloseAllToast, errorToast, successToast } from '@/lib/toastify';
import VerifyOtp from './component/verify-otp';

export const registerSchema = z.object({
  username: z.string().min(1, 'Vui lòng nhập tên đăng nhập'),
  fullName: z.string().min(1, 'Vui lòng nhập họ tên'),
  email: z.string().email('Vui lòng nhập email hợp lệ'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải lớn hơn 8 ký tự'),
  confirmPassword: z.string().min(1, 'Vui lòng nhập lại mật khẩu').min(8, 'Mật khẩu phải lớn hơn 8 ký tự'),
  cccd: z.string().min(1, 'Vui lòng nhập số CMND/CCCD'),
  phone: z.string().min(1, 'Vui lòng nhập số điện thoại'),
  address: z.string().min(1, 'Vui lòng nhập địa chỉ'),
  birthday: z.date({
    required_error: 'Vui lòng nhập ngày sinh',
  }),
  cccdFront: z.optional(z.instanceof(File).refine(file => file.size > 0, 'Chọn ảnh mặt trước')),
  cccdBack: z.optional(z.instanceof(File).refine(file => file.size > 0, 'Chọn ảnh mặt sau')),
});

type FormData = z.infer<typeof registerSchema>;

function RegisterPageClient({ role }: { role: RoleType }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      cccd: '',
      phone: '',
      address: '',
      birthday: undefined,
      cccdFront: undefined,
      cccdBack: undefined,
    },
  });

  const onSubmit = (data: FormData) => {
    CloseAllToast();
    if (data.password !== data.confirmPassword) {
      errorToast('Mật khẩu không khớp');
      return;
    }

    if (data.cccdFront === undefined || data.cccdBack === undefined) {
      errorToast('Vui lòng chọn ảnh CCCD');
      return;
    }

    if (data.birthday > new Date()) {
      errorToast('Ngày sinh phải nhỏ hơn ngày hiện tại');
      return;
    }

    startTransition(async () => {
      try {
        const cccdFrontBase64 = await fileToBase64(data.cccdFront!);
        const cccdBackBase64 = await fileToBase64(data.cccdBack!);

        const res = await httpPageApi.execService(
          { id: AuthServiceIds.Register },
          {
            ...data,
            roleId: role.id,
            cccdFront: cccdFrontBase64,
            cccdBack: cccdBackBase64,
          }
        );

        if (!res.ok) {
          errorToast(res.data.message);
          return;
        }

        successToast(res.data.message);
        setIsOpenDialog(true);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tên đăng nhập <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Tên đăng nhập" icon={<FaUser />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Email" icon={<IoIosMail />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Họ tên <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Họ tên" icon={<FaUserAstronaut />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mật khẩu <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={isPasswordShown ? 'Mật khẩu' : '******'}
                    type={isPasswordShown ? 'text' : 'password'}
                    icon={<FaLock />}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordShown(!isPasswordShown)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={isPasswordShown ? 'Hide password' : 'Show password'}
                  >
                    {isPasswordShown ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nhập lại mật khẩu <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={isPasswordShown ? 'Nhập lại mật khẩu' : '******'}
                    type={isPasswordShown ? 'text' : 'password'}
                    icon={<FaUnlock />}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordShown(!isPasswordShown)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={isPasswordShown ? 'Hide password' : 'Show password'}
                  >
                    {isPasswordShown ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cccd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Số CMND/CCCD <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Số CMND/CCCD" icon={<FaIdCard />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Số điện thoại <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Số điện thoại" icon={<FaPhone />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Địa chỉ <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Địa chỉ" icon={<FaHouseMedical />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Ngày sinh<span className="text-red-500">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn('justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      <CalendarIcon className="h-4 w-4 opacity-50" />
                      {field.value ? format(field.value, 'P') : <span>Chọn ngày sinh</span>}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="cccdFront"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ảnh CCCD mặt trước <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <ImageUploader maxSize={2_000_000} onChangeImage={file => field.onChange(file)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="cccdBack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ảnh CCCD mặt sau <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <ImageUploader maxSize={2_000_000} onChangeImage={file => field.onChange(file)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
          Đăng ký
        </Button>
      </form>
      <ShowLoading isPending={isPending} />
      {isOpenDialog && <VerifyOtp email={form.getValues('email')} onClose={() => setIsOpenDialog(false)} />}
    </Form>
  );
}

export default RegisterPageClient;
