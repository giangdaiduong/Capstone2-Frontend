'use client';

import React, { ReactNode, useEffect, useState, useMemo, forwardRef } from 'react';
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
  FaUserCircle, // Example for profile icon
  FaKey,        // Example for change password icon
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


// --- 1. Component con: NavLinkItem ---
// Dùng forwardRef vì DropdownMenuTrigger có thể cần ref cho một số trường hợp,
// mặc dù ở đây chúng ta không dùng trực tiếp ref cho Link, nhưng là một practice tốt.
interface NavLinkItemProps {
  href: string;
  icon: React.ElementType<{ className?: string }>;
  isActive: boolean;
  label: string;
}

const NavLinkItem = React.memo(({ href, icon: Icon, isActive, label }: NavLinkItemProps) => {
  const iconClasses = clsx(
    'text-2xl pb-1 cursor-pointer transition-colors duration-200',
    isActive ? 'text-[#1A2B88] border-b-2 border-[#1A2B88]' : 'text-gray-600 hover:text-[#1A2B88]/80'
  );

  return (
    <Link href={href} aria-label={label} className="flex flex-col items-center justify-center">
      <Icon className={iconClasses} />
      {/* <span className={clsx("text-xs mt-1", isActive ? "text-[#1A2B88]" : "text-gray-500")}>
        {label}
      </span> */}
    </Link>
  );
});
NavLinkItem.displayName = 'NavLinkItem'; // Quan trọng cho React DevTools

// --- 2. Component con: UserAuthSection ---
// Xử lý phần hiển thị avatar, notification và dropdown menu khi người dùng đăng nhập
interface UserAuthSectionProps {
  session: any; // Thay thế 'any' bằng kiểu Session thực tế của NextAuth
}

const UserAuthSection = React.memo(({ session }: UserAuthSectionProps) => {
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
          <DropdownMenuLabel className="font-normal flex flex-col items-start gap-y-1">
            <p className="text-sm font-semibold leading-none">{session.user?.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground break-all">{session.user?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={linkTo.user.profile} className="flex items-center space-x-2 cursor-pointer">
              <FaUserCircle className="h-4 w-4 text-gray-500" />
              <span>Quản lý tài khoản</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={linkTo.user.changePassword} className="flex items-center space-x-2 cursor-pointer">
              <FaKey className="h-4 w-4 text-gray-500" />
              <span>Đổi mật khẩu</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: linkTo.login })} // Chuyển hướng về trang đăng nhập sau khi đăng xuất
            className="flex items-center space-x-2 text-red-600 cursor-pointer hover:bg-red-50 focus:bg-red-50"
          >
            <FaPowerOff className="h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
UserAuthSection.displayName = 'UserAuthSection';

// --- 3. Component con: GuestAuthLinks ---
// Xử lý phần đăng nhập/đăng ký khi người dùng chưa đăng nhập
const GuestAuthLinks = React.memo(() => {
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
  const pathname = usePathname();
  const { data: session, status } = useSession(); // Lấy cả status để xử lý trạng thái loading
  const [activePath, setActivePath] = useState<string>('');

  // Định nghĩa các mục điều hướng
  const navItems = useMemo(() => [
    { id: 'home', href: linkTo.home, label: 'Trang chủ', icon: FaHome },
    { id: 'userplus', href: '/user-plus', label: 'Thêm người dùng', icon: FaUserPlus },
    { id: 'ideas', href: linkTo.user.ideas.base, label: 'Ý tưởng', icon: FaStore },
    { id: 'users', href: '/users', label: 'Người dùng', icon: FaUsers },
  ], []);

  // Xác định đường dẫn đang hoạt động
  useEffect(() => {
    // Logic phức tạp hơn nếu bạn có các đường dẫn lồng nhau, ví dụ: /users/profile vs /users/settings
    // Hiện tại, đơn giản là khớp chính xác href
    const currentActive = navItems.find(item => item.href === pathname);
    setActivePath(currentActive ? currentActive.href : '');
  }, [pathname, navItems]); // Dependency `navItems` để đảm bảo useEffect chạy lại nếu danh sách navItems thay đổi

  return (
    <header className="bg-white shadow-md py-2 px-4 flex justify-between items-center z-10 relative">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 min-w-[180px]">
        <Link href={linkTo.home} aria-label="Go to Home" className="block">
          <Image src={Logo} alt="Ideax Logo" className="h-10 w-auto" priority />
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