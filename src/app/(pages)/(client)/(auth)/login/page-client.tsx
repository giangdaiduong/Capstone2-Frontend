'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import linkTo from '@/utils/linkTo';
import { Eye, EyeOff } from 'lucide-react';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import ErrorComponent from '@/components/layouts/ErrorComponent';

export const loginSchema = z.object({
  userName: z.string().min(1, 'Vui lòng nhập tên tài khoản'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu').min(5, 'Mật khẩu phải lớn hơn 5 ký tự'),
});

type FormData = z.infer<typeof loginSchema>;

function LoginPageClient() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    setServerError('');
    startTransition(async () => {
      try {
        const res = await signIn('credentials', {
          userName: data.userName,
          password: data.password,
          redirect: false,
        });

        if (res && res.ok) {
          // Vars
          const redirectURL = searchParams.get('redirectTo') ?? '/';

          router.replace(redirectURL);
        } else {
          if (res?.error) {
            setServerError(res.error);
          }
        }
      } catch (error) {
        console.error(error);

        setServerError('Lỗi khi đăng nhập');
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tên đăng nhập <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Tên đăng nhập" {...field} />
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
        <ErrorComponent error={serverError} type="text" className="text-center" />
        <Link href={linkTo.forgotPassword} className="flex justify-end hover:underline mt-1">
          Quên mật khẩu?
        </Link>
        <Button className="w-full cursor-pointer" type="submit">
          Đăng nhập
        </Button>
        <Link href={linkTo.register} className="flex justify-center hover:underline">
          Đăng ký tài khoản
        </Link>
      </form>
      <ShowLoading isPending={isPending} />
    </Form>
  );
}

export default LoginPageClient;
