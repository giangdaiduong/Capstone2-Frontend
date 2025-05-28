'use client';

import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserType } from '@/types/UserType';
import { RoleType } from '@/types/RoleTypes';
import { formatDate } from 'date-fns';
import { format } from 'date-fns';
import { z } from 'zod';
import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IoIosMail } from 'react-icons/io';
import { FaPhone, FaUserAstronaut } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { FaHouseMedical } from 'react-icons/fa6';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CloseAllToast, errorToast, successToast } from '@/lib/toastify';
import { httpPageApi } from '@/api-base';
import { Avatar } from '@radix-ui/react-avatar';

export const userProfileSchema = z.object({
  fullName: z.string().min(1, 'Vui lòng nhập tên đầy đủ'),
  email: z.string().email('Vui lòng nhập email hợp lệ'),
  phone: z.string().min(1, 'Vui lòng nhập số điện thoại'),
  address: z.string().min(1, 'Vui lòng nhập địa chỉ'),
  birthday: z.date({
    required_error: 'Vui lòng nhập ngày sinh',
  }),
  roleId: z.string().min(1, 'Vui lòng chọn vai trò'),
});

type FormData = z.infer<typeof userProfileSchema>;

function UserProfileClient({ user, roles }: { user: UserType; roles: RoleType[] }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      birthday: user.birthday ? new Date(user.birthday) : undefined,
      roleId: user.roleId,
    },
  });

  const onSubmit = (data: FormData) => {
    CloseAllToast();

    if (data.birthday > new Date()) {
      errorToast('Ngày sinh phải nhỏ hơn ngày hiện tại');
      return;
    }

    startTransition(async () => {
      try {
        const res = await httpPageApi.execService({ id: 'user.updateUserProfile', params: { id: user.id } }, data);

        if (!res.ok) {
          errorToast(res.data.message);
          return;
        }

        successToast(res.data.message);
      } catch (error) {
        console.error(error);
        errorToast(error instanceof Error ? error.message : 'Đã xảy ra lỗi');
      }
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex gap-5 flex-row items-center justify-between">
          <div className="flex items-center w-full gap-6 flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="">
              <h4 className="mb-2 text-lg font-semibold text-left">{user.fullName}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Thành viên từ: {formatDate(user.createdOn, 'dd/MM/yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <Form {...form}>
          <form className="space-y-4" noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Họ tên */}
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
              {/* Email */}
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
              {/* Số điện thoại */}
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
              {/* Ngày sinh */}
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
                            className={cn(
                              'justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
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
              {/* Địa chỉ */}
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
              {/* Vai trò */}
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vai trò</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.roleName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="float-right cursor-pointer" disabled={isPending}>
              Cập nhật
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UserProfileClient;
