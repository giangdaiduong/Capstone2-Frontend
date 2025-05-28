'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CategoryType } from '@/types/CategoryTypes';
import { UserType } from '@/types/UserType';
import { IdeaRegion, IdeaStage } from '@/utils/constants';
import { useState, useTransition } from 'react';
import { SaveIcon, XIcon } from 'lucide-react';
import linkTo from '@/utils/linkTo';
import Link from 'next/link';
import { httpPageApi } from '@/api-base';
import { UserServiceIds } from '@/api-base/services/user-services';
import { CloseAllToast, errorToast, successToast } from '@/lib/toastify';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';

type InvestorState = UserType & {
  preferredIndustriesOther?: string;
};

function InvestorProfilePageClient({ categories, user }: { categories: CategoryType[]; user: UserType }) {
  const [userData, setUserData] = useState<InvestorState>({
    ...user,
    preferredIndustriesOther:
      user.preferredIndustries && !categories.some(c => c.name === user.preferredIndustries)
        ? user.preferredIndustries
        : '',
    preferredIndustries: categories.some(c => c.name === user.preferredIndustries) ? user.preferredIndustries : 'OTHER',
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      CloseAllToast();
      const payload = {
        ...userData,
        preferredIndustries:
          userData.preferredIndustries === 'OTHER'
            ? userData.preferredIndustriesOther?.trim() || 'OTHER'
            : userData.preferredIndustries,
      };

      const res = await httpPageApi.execService(
        { id: UserServiceIds.UpdatePreferenceIdea },
        {
          preferredIndustries: payload.preferredIndustries,
          preferredStages: payload.preferredStages,
          preferredRegions: payload.preferredRegions,
          fundingRangeMin: payload.fundingRangeMin,
          fundingRangeMax: payload.fundingRangeMax,
        }
      );

      if (!res.ok) {
        errorToast(res.data?.message || 'Lỗi khi cập nhật thông tin đầu tư!');
        return;
      }

      successToast('Cập nhật thông tin đầu tư thành công!');
    });
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7 text-center">
        Thông tin đầu tư
      </h3>
      <Separator />
      <div className="space-y-8 p-4">
        {/* Industry Categories */}
        <div className="space-y-4">
          <Label className="text-base font-bold text-gray-800 dark:text-white/90">
            Ngành nghề bạn quan tâm <span className="text-red-500">(*)</span>
          </Label>
          <RadioGroup
            value={userData.preferredIndustries}
            onValueChange={value => setUserData(prev => ({ ...prev, preferredIndustries: value }))}
            className="flex flex-wrap gap-4"
          >
            {categories.map(category => (
              <div key={category.id} className="flex items-center space-x-3">
                <RadioGroupItem value={category.name} id={category.id} />
                <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                  {category.name}
                </Label>
              </div>
            ))}

            {/* OTHER */}
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="OTHER" id="OTHER" />
              <Label htmlFor="OTHER" className="text-sm font-normal cursor-pointer">
                Khác
              </Label>

              {userData.preferredIndustries === 'OTHER' && (
                <Input
                  placeholder="Nhập ngành khác"
                  value={userData.preferredIndustriesOther ?? ''}
                  onChange={e =>
                    setUserData(prev => ({
                      ...prev,
                      preferredIndustriesOther: e.target.value,
                    }))
                  }
                  className="ml-2 w-40 h-8"
                />
              )}
            </div>
          </RadioGroup>
        </div>
        {/* Development Stage */}
        <div className="space-y-4">
          <Label className="text-base font-bold text-gray-800 dark:text-white/90">
            Giai đoạn phát triển ưu tiên <span className="text-red-500">(*)</span>
          </Label>
          <RadioGroup
            value={userData.preferredStages}
            onValueChange={e => setUserData({ ...userData, preferredStages: e })}
            className="flex flex-wrap gap-4"
          >
            {IdeaStage.map(stage => (
              <div key={stage.key} className="flex items-center space-x-3">
                <RadioGroupItem value={stage.key} id={stage.key} />
                <Label htmlFor={stage.key} className="text-sm font-normal cursor-pointer">
                  {stage.value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        {/* Investment Region */}
        <div className="space-y-4">
          <Label className="text-base font-bold text-gray-800 dark:text-white/90">
            Khu vực bạn muốn đầu tư <span className="text-red-500">(*)</span>
          </Label>
          <RadioGroup
            value={userData.preferredRegions}
            onValueChange={e => setUserData({ ...userData, preferredRegions: e })}
            className="flex flex-wrap gap-4"
          >
            {IdeaRegion.map(region => (
              <div key={region.key} className="flex items-center space-x-3">
                <RadioGroupItem value={region.key} id={region.key} />
                <Label htmlFor={region.key} className="text-sm font-normal cursor-pointer">
                  {region.value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        {/* Investment Amount Range */}
        <div className="space-y-4">
          <Label className="text-base font-medium text-gray-800 dark:text-white/90">
            Khoảng vốn có thể đầu tư <span className="text-red-500">(*)</span>
          </Label>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Label htmlFor="min-investment" className="text-sm font-normal w-16">
                Tối thiểu
              </Label>
              <Input
                id="min-investment"
                type="number"
                value={userData.fundingRangeMin}
                onChange={e => setUserData({ ...userData, fundingRangeMin: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-3">
              <Label htmlFor="max-investment" className="text-sm font-normal w-16">
                Tối đa
              </Label>
              <Input
                id="max-investment"
                type="number"
                value={userData.fundingRangeMax}
                onChange={e => setUserData({ ...userData, fundingRangeMax: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between space-x-4 p-4">
        <Link href={linkTo.investor.base}>
          <Button variant="secondary" className="bg-gray-400 hover:bg-gray-500 text-white">
            <XIcon /> Hủy
          </Button>
        </Link>
        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
          Lưu
          <SaveIcon />
        </Button>
      </div>
      <ShowLoading isPending={isPending} />
    </div>
  );
}

export default InvestorProfilePageClient;
