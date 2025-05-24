'use client';

import { DropdownMenuItemConfig, NavItemConfig } from '@/types/common';
import linkTo from '@/utils/linkTo';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { memo, useEffect, useMemo, useState } from 'react';
import { FaHome, FaUserCircle, FaKey, FaPowerOff } from 'react-icons/fa';
import { FaUserPen } from 'react-icons/fa6';
import { MdOutlineDashboard } from 'react-icons/md';
import { VscOpenPreview } from 'react-icons/vsc';
import { BsFileEarmarkPost } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import { NavLinkItem } from '../ClientCommon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Session } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import clsx from 'clsx';
import { UserRole } from '@/utils/constants';

const useActiveNavigation = () => {
  const pathname = usePathname();

  // Định nghĩa các mục điều hướng ở đây, tách biệt khỏi component chính
  const navItems: NavItemConfig[] = useMemo(
    () => [
      { id: 'dashboard', href: linkTo.admin.dashboard, label: 'Dashboard', icon: MdOutlineDashboard },
      { id: 'review', href: linkTo.admin.review, label: 'Xét duyệt bài viết', icon: VscOpenPreview },
      { id: 'ideas', href: linkTo.admin.idea, label: 'Quản lý bài viết', icon: BsFileEarmarkPost },
      { id: 'users', href: linkTo.admin.user, label: 'Quản lý người dùng', icon: FaUserPen },
    ],
    []
  );

  const [activePath, setActivePath] = useState<string>('');

  useEffect(() => {
    // Xác định đường dẫn đang hoạt động dựa trên `pathname` và `navItems`
    const currentActive = navItems.find(item => item.href === pathname);
    setActivePath(currentActive ? currentActive.href : '');
  }, [pathname, navItems]); // Dependency `navItems` để đảm bảo useEffect chạy lại nếu danh sách navItems thay đổi

  return { navItems, activePath };
};

// --- Component con: UserAuthSection ---
interface UserAuthSectionProps {
  session: Session | null;
}

const UserAuthSection = memo(({ session }: UserAuthSectionProps) => {
  // Cấu hình các mục trong Dropdown Menu
  const userDropdownItems: DropdownMenuItemConfig[] = useMemo(() => {
    const items: DropdownMenuItemConfig[] = [
      {
        id: 'profile-label',
        label: session?.user?.fullName,
        isLabel: true,
        className: 'flex flex-col items-start gap-y-1',
      },
      {
        id: 'email-label',
        label: session?.user?.email,
        isLabel: true,
        className: 'text-xs text-muted-foreground break-all mt-[-4px]',
      },
      { id: 'separator-1', isSeparator: true },
    ];

    if (session?.user?.roleName === UserRole.Admin) {
      items.push({
        id: 'dashboard',
        label: 'Dashboard',
        icon: FaHome,
        href: linkTo.admin.dashboard,
      });
    }

    items.push(
      {
        id: 'manage-account',
        label: 'Quản lý tài khoản',
        icon: FaUserCircle,
        href: linkTo.user.profile,
      },
      {
        id: 'change-password',
        label: 'Đổi mật khẩu',
        icon: FaKey,
        href: linkTo.user.changePassword,
      },
      { id: 'separator-2', isSeparator: true },
      {
        id: 'sign-out',
        label: 'Đăng xuất',
        icon: FaPowerOff,
        onClick: () => signOut({ callbackUrl: linkTo.login }),
        className: 'text-red-600 hover:bg-red-50 focus:bg-red-50',
      }
    );

    return items;
  }, [session]);

  return (
    <div className="flex items-center space-x-2 min-w-[180px] justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer border border-gray-200 hover:border-[#1A2B88] transition-colors duration-200">
            <AvatarImage src={session?.user?.avatar || undefined} alt={`${session?.user?.fullName}'s avatar`} />
            <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
              {session?.user?.fullName?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {userDropdownItems.map(item => {
            if (item.isLabel) {
              return (
                <DropdownMenuLabel key={item.id} className={clsx('font-normal', item.className)}>
                  {item.label}
                </DropdownMenuLabel>
              );
            }
            if (item.isSeparator) {
              return <DropdownMenuSeparator key={item.id} />;
            }
            const IconComponent = item.icon;
            return (
              <DropdownMenuItem key={item.id} onClick={item.onClick} asChild={!!item.href}>
                {item.href ? (
                  <Link href={item.href} className={clsx('flex items-center space-x-2 cursor-pointer', item.className)}>
                    {IconComponent && <IconComponent className="h-4 w-4 text-gray-500" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <div className={clsx('flex items-center space-x-2 cursor-pointer', item.className)}>
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </div>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
UserAuthSection.displayName = 'UserAuthSection';

function AdminHeaderClient() {
  const { data: session } = useSession();
  const { navItems, activePath } = useActiveNavigation();
  return (
    <header className="bg-white shadow-md py-2 px-4 flex justify-between items-center z-10 relative">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 min-w-[180px]">
        <Link href={linkTo.home} aria-label="Go to Home" className="block">
          <Image
            src={process.env.NEXT_PUBLIC_LOGO_URL || '/logo.png'}
            alt="Ideax Logo"
            className="h-10 w-auto"
            width={100}
            height={100}
            priority
          />
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex space-x-8">
        {navItems.map(item => (
          <NavLinkItem
            key={item.id}
            href={item.href}
            icon={item.icon}
            isActive={activePath === item.href}
            label={item.label}
          />
        ))}
      </nav>

      <UserAuthSection session={session} />
    </header>
  );
}

export default AdminHeaderClient;
