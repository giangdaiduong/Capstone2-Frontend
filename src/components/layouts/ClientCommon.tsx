'use client';

import { NavLinkItemProps } from '@/types/common';
import clsx from 'clsx';
import Link from 'next/link';
import { memo } from 'react';

export const NavLinkItem = memo(({ href, icon: Icon, isActive, label }: NavLinkItemProps) => {
  const iconClasses = clsx(
    'text-2xl pb-1 cursor-pointer transition-colors duration-200',
    isActive ? 'text-[#1A2B88] border-b-2 border-[#1A2B88]' : 'text-gray-600 hover:text-[#1A2B88]/80'
  );

  return (
    <Link href={href} aria-label={label} className="flex flex-col items-center justify-center">
      <Icon className={iconClasses} />
    </Link>
  );
});
NavLinkItem.displayName = 'NavLinkItem';
