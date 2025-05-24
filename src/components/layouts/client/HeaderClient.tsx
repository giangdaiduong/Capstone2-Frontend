'use client';

import React, { useEffect, useState, useMemo, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  FaStore,
  FaUserPlus,
  FaUsers,
  FaHome,
  FaComments,
  FaBell,
  FaPowerOff,
  FaUserCircle,
  FaKey,
} from 'react-icons/fa';
import { RxSlash } from 'react-icons/rx';
import clsx from 'clsx'; // Utility for conditionally joining CSS class names

// --- UI Components from shadcn/ui ---
import { NotificationBadge } from '@/components/ui/notification-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// --- Utility for consistent paths ---
import linkTo from '@/utils/linkTo';

// --- Type Definitions ---
interface NavItemConfig {
  id: string;
  href: string;
  label: string;
  icon: React.ElementType<{ className?: string }>;
}

interface DropdownMenuItemConfig {
  id: string;
  label: string;
  icon?: React.ElementType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  isSeparator?: boolean;
  isLabel?: boolean;
  className?: string;
}

// --- Custom Hook: useActiveNavigation ---
/**
 * Custom hook to manage navigation items and determine the active path.
 * This separates navigation data and active state logic from the UI component.
 */
const useActiveNavigation = () => {
  const pathname = usePathname();

  // Định nghĩa các mục điều hướng ở đây, tách biệt khỏi component chính
  const navItems: NavItemConfig[] = useMemo(() => [
    { id: 'home', href: linkTo.home, label: 'Trang chủ', icon: FaHome },
    { id: 'userplus', href: '/user-plus', label: 'Thêm người dùng', icon: FaUserPlus },
    { id: 'ideas', href: linkTo.user.ideas.base, label: 'Ý tưởng', icon: FaStore },
    { id: 'users', href: '/users', label: 'Người dùng', icon: FaUsers },
  ], []);

  const [activePath, setActivePath] = useState<string>('');

  useEffect(() => {
    // Xác định đường dẫn đang hoạt động dựa trên `pathname` và `navItems`
    const currentActive = navItems.find(item => item.href === pathname);
    setActivePath(currentActive ? currentActive.href : '');
  }, [pathname, navItems]); // Dependency `navItems` để đảm bảo useEffect chạy lại nếu danh sách navItems thay đổi

  return { navItems, activePath };
};

// --- Component con: NavLinkItem ---
interface NavLinkItemProps {
  href: string;
  icon: React.ElementType<{ className?: string }>;
  isActive: boolean;
  label: string;
}

const NavLinkItem = memo(({ href, icon: Icon, isActive, label }: NavLinkItemProps) => {
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

// --- Component con: UserAuthSection ---
interface UserAuthSectionProps {
  session: any; // Thay thế 'any' bằng kiểu Session thực tế của NextAuth
}

const UserAuthSection = memo(({ session }: UserAuthSectionProps) => {
  // Cấu hình các mục trong Dropdown Menu
  const userDropdownItems: DropdownMenuItemConfig[] = useMemo(() => [
    {
      id: 'profile-label',
      label: session.user?.fullName,
      isLabel: true,
      className: "flex flex-col items-start gap-y-1"
    },
    { id: 'email-label', label: session.user?.email, isLabel: true, className: "text-xs text-muted-foreground break-all mt-[-4px]" },
    { id: 'separator-1', isSeparator: true },
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
      className: "text-red-600 hover:bg-red-50 focus:bg-red-50"
    },
  ], [session]); // Phụ thuộc vào session để cập nhật thông tin người dùng

  return (
    <div className="flex items-center space-x-2 min-w-[180px] justify-end">
      <NotificationBadge count={8}>
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="View comments"
        >
          <FaComments className="text-gray-600 text-xl" />
        </button>
      </NotificationBadge>
      <NotificationBadge count={0}>
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="View notifications"
        >
          <FaBell className="text-gray-600 text-xl" />
        </button>
      </NotificationBadge>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer border border-gray-200 hover:border-[#1A2B88] transition-colors duration-200">
            <AvatarImage src={session.user?.avatar || undefined} alt={`${session.user?.fullName}'s avatar`} />
            <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
              {session.user?.fullName?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {userDropdownItems.map(item => {
            if (item.isLabel) {
              return <DropdownMenuLabel key={item.id} className={clsx("font-normal", item.className)}>{item.label}</DropdownMenuLabel>;
            }
            if (item.isSeparator) {
              return <DropdownMenuSeparator key={item.id} />;
            }
            const IconComponent = item.icon;
            return (
              <DropdownMenuItem key={item.id} onClick={item.onClick} asChild={!!item.href}>
                {item.href ? (
                  <Link href={item.href} className={clsx("flex items-center space-x-2 cursor-pointer", item.className)}>
                    {IconComponent && <IconComponent className="h-4 w-4 text-gray-500" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <div className={clsx("flex items-center space-x-2 cursor-pointer", item.className)}>
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

// --- Component con: GuestAuthLinks ---
const GuestAuthLinks = memo(() => {
  return (
    <div className="flex items-center space-x-1 min-w-[180px] justify-end">
      <Link
        href={linkTo.login}
        className="bg-gradient-to-l from-[#f64f59] via-[#c471ed] to-[#12c2e9] bg-clip-text text-transparent font-bold
        transform transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
        aria-label="Login"
      >
        Đăng nhập
      </Link>
      <RxSlash className="text-gray-400 text-sm" />
      <Link
        href={linkTo.register}
        className="bg-gradient-to-l to-[#f64f59] via-[#c471ed] from-[#12c2e9] bg-clip-text text-transparent font-bold
        transform transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
        aria-label="Register"
      >
        Đăng ký
      </Link>
    </div>
  );
});
GuestAuthLinks.displayName = 'GuestAuthLinks';

// --- Main Component: HeaderClient ---
/**
 * Header component for the client-side of the application.
 * Manages navigation, user authentication status display, and notifications.
 */
function HeaderClient() {
  const { data: session, status } = useSession(); // Lấy cả status để xử lý trạng thái loading
  const { navItems, activePath } = useActiveNavigation(); // Sử dụng custom hook

  return (
    <header className="bg-white shadow-md py-2 px-4 flex justify-between items-center z-10 relative">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 min-w-[180px]">
        <Link href={linkTo.home} aria-label="Go to Home" className="block">
          <Image src={process.env.NEXT_PUBLIC_LOGO_URL || '/logo.png'} alt="Ideax Logo" className="h-10 w-auto" priority />
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex space-x-8">
        {navItems.map(item => (
          <NavLinkItem
            key={item.id}
            href={item.href}
            icon={item.icon}
            isActive={activePath === item.href} // So sánh trực tiếp href
            label={item.label}
          />
        ))}
      </nav>

      {/* User Actions / Auth Section */}
      {status === 'loading' ? (
        // Hiển thị skeleton hoặc spinner khi đang tải trạng thái session
        <div className="min-w-[180px] h-10 flex items-center justify-end animate-pulse">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
      ) : session ? (
        <UserAuthSection session={session} />
      ) : (
        <GuestAuthLinks />
      )}
    </header>
  );
}

export default HeaderClient;