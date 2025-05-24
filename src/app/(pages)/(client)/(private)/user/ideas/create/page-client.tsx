'use client';

import { CategoryType } from '@/types/CategoryTypes';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createIdeaSchema } from '@/types/IdeaTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ImageUploader } from '@/components/ui/image-uploader';
import { IdeaStatus } from '@/utils/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import PolicyDialog from './component/PolicyDialog';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { httpPageApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { CloseAllToast, errorToast, successToast } from '@/lib/toastify';
import { useRouter } from 'next/navigation';
import linkTo from '@/utils/linkTo';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

type FormData = z.infer<typeof createIdeaSchema>;

function CreateIdeaPageClient({ categories }: { categories: CategoryType[] }) {
  const { data: session } = useSession();
  const [isOpenPolicy, setIsOpenPolicy] = useState(false);
  const [isAgreePolicy, setIsAgreePolicy] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(createIdeaSchema),
    defaultValues: {
      title: '',
      description: '',
      initiatorId: session?.user?.id,
      categoryId: categories[0].id,
      createdBy: session?.user?.id,
      imageUrls: '',
      copyrightStatus: false,
      copyrightCertificate: '',
      status: IdeaStatus[0].key,
      collaborationType: '',
      price: 0,
      isForSale: false,
      isPublic: false,
    },
  });

  const onSubmit = (data: FormData) => {
    CloseAllToast();
    if (data.copyrightStatus && !data.copyrightCertificate) {
      errorToast('Vui lòng upload chứng nhận bản quyền');
      return;
    }

    if (!isAgreePolicy) {
      setIsOpenPolicy(true);
      return;
    }

    startTransition(async () => {
      const res = await httpPageApi.execService(
        { id: IdeaServiceIds.CreateIdea },
        {
          ...data,
        }
      );

      if (!res.ok) {
        errorToast(res.data?.message || 'Lỗi khi tạo ý tưởng');
        return;
      }

      successToast(res.data?.message || 'Tạo ý tưởng thành công');
      router.push(linkTo.user.ideas.base);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Link href={linkTo.user.ideas.base}>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <FaArrowLeft />
          Quay lại danh sách ý tưởng
        </Button>
      </Link>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit, err => console.log(err))} className="space-y-4">
          <Card>
            <CardHeader>
              <div className="text-lg font-bold text-blue-700 px-2 border-l-[4px] border-l-blue-900">
                Thông tin cơ bản về ý tưởng
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Tiêu đề <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Tóm tắt tiêu đề ngắn gọn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Lĩnh vực ngành <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn lĩnh vực ngành" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#F5F8FC]">
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Nội dung chi tiết ý tưởng <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Mô tả ý tưởng, lợi ích..." className="resize-none" rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mx-auto">
                <FormField
                  control={form.control}
                  name="imageUrls"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel className="w-full">
                        <div className="font-bold">
                          <span>Ảnh minh họa</span>
                          <span className="text-red-500">*</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          maxSize={5_000_000}
                          onChangeImage={file => {
                            if (!file) {
                              field.onChange('');
                              return;
                            }

                            const reader = new FileReader();
                            reader.onload = e => {
                              field.onChange((e.target?.result as string) || '');
                            };
                            reader.readAsDataURL(file);
                          }}
                          text="Click để upload hoặc kéo thả file ảnh minh họa"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="copyrightStatus"
                render={({ field }) => (
                  <FormItem className="flex gap-4 items-start">
                    <FormLabel className="font-bold mr-2">
                      Đã đăng ký bản quyền ý tưởng? <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={val => field.onChange(val === 'true')}
                        defaultValue={field.value ? 'true' : 'false'}
                        className="flex flex-col items-start md:flex-row md:items-center"
                      >
                        <FormItem className="flex items-center mr-4">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Đã đăng ký</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Chưa đăng ký</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mx-auto">
                <FormField
                  control={form.control}
                  name="copyrightCertificate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <ImageUploader
                          maxSize={5_000_000}
                          onChangeImage={file => {
                            if (!file) {
                              field.onChange('');
                              return;
                            }

                            const reader = new FileReader();
                            reader.onload = e => {
                              field.onChange((e.target?.result as string) || '');
                            };
                            reader.readAsDataURL(file);
                          }}
                          text="Click để upload hoặc kéo thả file chứng nhận bản quyền"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="text-lg font-bold text-blue-700 px-2 border-l-[4px] border-l-blue-900">
                Thông tin gọi vốn
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex gap-4 items-start">
                    <FormLabel className="font-bold mr-2">
                      Trạng thái <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap items-center"
                      >
                        {IdeaStatus.map(status => {
                          return (
                            <FormItem key={status.key} className="flex items-center mr-4">
                              <FormControl>
                                <RadioGroupItem value={status.key} />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">{status.value}</FormLabel>
                            </FormItem>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row items-start gap-4">
                <FormField
                  control={form.control}
                  name="collaborationType"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel className="font-bold">Hình thức hợp tác</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Hình thức hợp tác" value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel className="font-bold">Vốn cần huy động</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Nhập số tiền cần huy động"
                          value={field.value || ''}
                          onChange={e => {
                            const value = e.target.value;
                            if (value === '' || /^[0-9]*$/.test(value)) {
                              field.onChange(Number(value));
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="isForSale"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md px-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Tôi muốn bán ý tưởng</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md px-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Công khai ý tưởng</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <div className="flex items-center space-x-2 m-2">
            <Checkbox id="policy" checked={isAgreePolicy} onCheckedChange={() => setIsAgreePolicy(!isAgreePolicy)} />
            <label
              htmlFor="policy"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Đồng ý với{' '}
              <Button
                type="button"
                variant="link"
                className="px-0 font-bold text-blue-700"
                onClick={() => setIsOpenPolicy(true)}
              >
                điều khoản và cam kết
              </Button>
            </label>
          </div>
          <div className="text-center">
            <Button type="submit" className="bg-blue-700 hover:bg-blue-800">
              <PlusIcon /> Đăng ý tưởng
            </Button>
          </div>
        </form>
        {isOpenPolicy && (
          <PolicyDialog
            onClose={() => setIsOpenPolicy(false)}
            onAgree={() => {
              setIsAgreePolicy(true);
              setIsOpenPolicy(false);
            }}
          />
        )}
        <ShowLoading isPending={isPending} />
      </Form>
    </div>
  );
}

export default CreateIdeaPageClient;
