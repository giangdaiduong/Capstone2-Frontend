'use client';

import { ReactNode, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import { FaStore, FaUserPlus, FaUsers, FaHome, FaComments, FaBell, FaPowerOff } from 'react-icons/fa';
import Link from 'next/link';
import linkTo from '@/utils/linkTo';
import { signOut, useSession } from 'next-auth/react';
import { RxSlash } from 'react-icons/rx';
import { NotificationBadge } from '@/components/ui/notification-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * Renders the header component for the client-side.
 * It displays navigation icons, notification badges, and user-specific options
 * based on the authentication status.
 */
function HeaderClient() {
  const [activeIcon, setActiveIcon] = useState('');
  const pathname = usePathname();
  const { data: session } = useSession();

  /**
   * Updates the active navigation icon based on the current pathname.
   */
  useEffect(() => {
    const iconMap: Record<string, string> = {
      [linkTo.home]: 'home',
      [linkTo.user.ideas.base]: 'ideas',
      '/user-plus': 'userplus',
      '/users': 'users',
    };
    setActiveIcon(iconMap[pathname] || '');
  }, [pathname]);

  /**
   * Dynamically applies styles to navigation icons based on their active state.
   * @param iconName The name of the icon.
   * @returns Tailwind CSS classes for the icon.
   */
  const getIconStyle = (iconName: string) =>
    `${
      activeIcon === iconName ? 'text-[#1A2B88] border-b-2 border-[#1A2B88]' : 'text-gray-600'
    } text-2xl pb-1 cursor-pointer`;

  /**
   * Helper component to render a navigation icon wrapped in a Link.
   * @param icon The ReactNode representing the icon.
   * @param href The URL for the link.
   * @returns A Link component containing the icon.
   */
  const HeaderIcon = ({ icon, href }: { icon: ReactNode; href: string }) => (
    <Link href={href}>{icon}</Link>
  );

  // Memoize the navigation links to prevent unnecessary re-renders
  const memoizedNavLinks = useMemo(
    () => (
      <>
        <HeaderIcon icon={<FaHome className={getIconStyle('home')} />} href={linkTo.home} />
        <HeaderIcon icon={<FaUserPlus className={getIconStyle('userplus')} />} href="/user-plus" />
        <HeaderIcon icon={<FaStore className={getIconStyle('ideas')} />} href={linkTo.user.ideas.base} />
        <HeaderIcon icon={<FaUsers className={getIconStyle('users')} />} href="/users" />
      </>
    ),
    [activeIcon] // Re-render if activeIcon changes
  );

  return (
    <header className="bg-white shadow-md py-2 px-4 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 min-w-[180px]">
        <Image src={Logo} alt="Ideax Logo" className="h-10 w-auto" priority />
      </div>

      {/* Navigation Section */}
      <nav className="flex space-x-8">{memoizedNavLinks}</nav>

      {/* User Actions / Auth Section */}
      {session ? (
        <div className="flex items-center space-x-2 min-w-[180px] justify-end">
          {/* Notification Badges */}
          <NotificationBadge count={8}>
            <button
              aria-label="Comments"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FaComments className="text-gray-600 text-xl" />
            </button>
          </NotificationBadge>
          <NotificationBadge count={0}>
            <button
              aria-label="Notifications"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FaBell className="text-gray-600 text-xl" />
            </button>
          </NotificationBadge>

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={session.user?.avatar} alt={`${session.user?.fullName}'s avatar`} />
                <AvatarFallback>{session.user?.fullName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{session.user?.fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={linkTo.user.profile} className="flex items-center">
                  Quản lý tài khoản
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={linkTo.user.changePassword} className="flex items-center">
                  Đổi mật khẩu
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="flex items-center cursor-pointer">
                <FaPowerOff className="mr-2 h-4 w-4" />
                Đăng xuất
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
            transform transition-transform duration-200 ease-in-out hover:scale-110"
          >
            Đăng nhập
          </Link>
          <RxSlash className="text-gray-400" />
          <Link
            href={linkTo.register}
            className="bg-gradient-to-l to-[#f64f59] via-[#c471ed] from-[#12c2e9] bg-clip-text text-transparent font-bold
            transform transition-transform duration-200 ease-in-out hover:scale-110"
          >
            Đăng ký
          </Link>
        </div>
      )}
    </header>
  );
}

export default HeaderClient;