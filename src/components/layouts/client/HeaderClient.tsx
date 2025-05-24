'use client';

import { ReactNode, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import { FaStore, FaUserPlus, FaUsers, FaHome, FaComments, FaBell, FaPowerOff } from 'react-icons/fa';
import Link from 'next/link';
import linkTo from '@/utils/linkTo'; // Assuming this utility provides consistent paths
import { signOut, useSession } from 'next-auth/react';
import { RxSlash } from 'react-icons/rx';
import { NotificationBadge } from '@/components/ui/notification-badge'; // Shadcn-ui component
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Shadcn-ui component
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'; // Shadcn-ui component

/**
 * Defines the structure for each navigation item in the header.
 */
interface NavItem {
  id: string;
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeKey: string; // Key to match with activeIcon state
}

/**
 * Header component for the client-side of the application.
 * Manages navigation, user authentication status display, and notifications.
 */
function HeaderClient() {
  const [activeIcon, setActiveIcon] = useState<string>('');
  const pathname = usePathname();
  const { data: session } = useSession();

  // Define navigation items as an array for easier management and iteration
  const navItems: NavItem[] = useMemo(() => [
    { id: 'home', href: linkTo.home, label: 'Trang chủ', icon: FaHome, activeKey: 'home' },
    { id: 'userplus', href: '/user-plus', label: 'Thêm người dùng', icon: FaUserPlus, activeKey: 'userplus' },
    { id: 'ideas', href: linkTo.user.ideas.base, label: 'Ý tưởng', icon: FaStore, activeKey: 'ideas' },
    { id: 'users', href: '/users', label: 'Người dùng', icon: FaUsers, activeKey: 'users' },
  ], []); // Empty dependency array ensures this is memoized once

  /**
   * Updates the `activeIcon` state based on the current `pathname`.
   * Iterates through `navItems` to find a match.
   */
  useEffect(() => {
    const currentActiveItem = navItems.find(item => item.href === pathname);
    setActiveIcon(currentActiveItem?.activeKey || '');
  }, [pathname, navItems]); // Re-run if pathname or navItems change

  /**
   * Generates dynamic Tailwind CSS classes for a navigation icon based on its active state.
   * @param key The activeKey of the navigation item.
   * @returns A string of Tailwind CSS classes.
   */
  const getIconStyle = (key: string): string =>
    `${activeIcon === key ? 'text-[#1A2B88] border-b-2 border-[#1A2B88]' : 'text-gray-600'} 
     text-2xl pb-1 cursor-pointer transition-colors duration-200`;

  /**
   * Memoized navigation links to prevent unnecessary re-renders.
   * Renders the navigation icons by mapping over the `navItems` array.
   */
  const memoizedNavLinks = useMemo(
    () => (
      <nav className="flex space-x-8">
        {navItems.map(item => {
          const IconComponent = item.icon; // Get the icon component from the item
          return (
            <Link href={item.href} key={item.id} aria-label={item.label}>
              <IconComponent className={getIconStyle(item.activeKey)} />
            </Link>
          );
        })}
      </nav>
    ),
    [navItems, activeIcon] // Re-render if navItems (unlikely) or activeIcon changes
  );

  return (
    <header className="bg-white shadow-md py-2 px-4 flex justify-between items-center z-10 relative">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 min-w-[180px]">
        <Link href={linkTo.home} aria-label="Go to Home">
          <Image src={Logo} alt="Ideax Logo" className="h-10 w-auto" priority />
        </Link>
      </div>

      {/* Navigation Section */}
      {memoizedNavLinks}

      {/* User Actions / Auth Section */}
      {session ? (
        <div className="flex items-center space-x-2 min-w-[180px] justify-end">
          {/* Notification Badges */}
          <NotificationBadge count={8}>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="View comments">
              <FaComments className="text-gray-600 text-xl" />
            </button>
          </NotificationBadge>
          <NotificationBadge count={0}>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="View notifications">
              <FaBell className="text-gray-600 text-xl" />
            </button>
          </NotificationBadge>

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer border border-gray-200 hover:border-[#1A2B88] transition-colors">
                <AvatarImage src={session.user?.avatar} alt={`${session.user?.fullName}'s avatar`} />
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
                  {/* <FaUserCircle className="h-4 w-4" /> */}
                  <span>Quản lý tài khoản</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={linkTo.user.changePassword} className="flex items-center space-x-2 cursor-pointer">
                  {/* <FaKey className="h-4 w-4" /> */}
                  <span>Đổi mật khẩu</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="flex items-center space-x-2 text-red-600 cursor-pointer hover:bg-red-50">
                <FaPowerOff className="h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        // Login/Register Links
        <div className="flex items-center space-x-1 min-w-[180px] justify-end">
          <Link
            href={linkTo.login}
            className="bg-gradient-to-l from-[#f64f59] via-[#c471ed] to-[#12c2e9] bg-clip-text text-transparent font-bold
            transform transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
            aria-label="Login"
          >
            Đăng nhập
          </Link>
          <RxSlash className="text-gray-400" />
          <Link
            href={linkTo.register}
            className="bg-gradient-to-l to-[#f64f59] via-[#c471ed] from-[#12c2e9] bg-clip-text text-transparent font-bold
            transform transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
            aria-label="Register"
          >
            Đăng ký
          </Link>
        </div>
      )}
    </header>
  );
}

export default HeaderClient;