'use client';

import { ReactNode, useEffect, useState } from 'react';
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

function HeaderClient() {
  const [activeIcon, setActiveIcon] = useState('');
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    switch (pathname) {
      case linkTo.home:
        setActiveIcon('home');
        break;
      case linkTo.user.ideas.base:
        setActiveIcon('ideas');
        break;
      case '/user-plus':
        setActiveIcon('userplus');
        break;
      case '/users':
        setActiveIcon('users');
        break;
      default:
        setActiveIcon('');
    }
  }, [pathname]);

  const iconStyle = (iconName: string) =>
    `${
      activeIcon === iconName ? 'text-[#1A2B88] border-b-2 border-[#1A2B88]' : 'text-gray-600'
    } text-2xl pb-1 cursor-pointer`;

  return (
    <header className="bg-white shadow-md py-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2 min-w-[180px]">
        <Image src={Logo} alt="Ideax Logo" className="h-10 w-auto" />
      </div>
      <nav className="flex space-x-8">
        {getHeaderIcon(<FaHome className={iconStyle('home')} />, linkTo.home)}
        {getHeaderIcon(<FaUserPlus className={iconStyle('userplus')} />, '/user-plus')}
        {getHeaderIcon(<FaStore className={iconStyle('ideas')} />, linkTo.user.ideas.base)}
        {getHeaderIcon(<FaUsers className={iconStyle('users')} />, '/users')}
      </nav>
      {session ? (
        <div className="flex items-center space-x-2 min-w-[180px]">
          <NotificationBadge count={8}>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <FaComments className="text-gray-600 text-xl" />
            </button>
          </NotificationBadge>
          <NotificationBadge count={0}>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <FaBell className="text-gray-600 text-xl" />
            </button>
          </NotificationBadge>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session.user?.avatar} />
                <AvatarFallback>{session.user?.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user?.fullName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={linkTo.user.profile}>Quản lý tài khoản</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={linkTo.user.changePassword}>Đổi mật khẩu</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <FaPowerOff />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center space-x-1 min-w-[180px]">
          <Link
            href={linkTo.login}
            className="bg-gradient-to-l from-[#f64f59] via-[#c471ed] to-[#12c2e9] bg-clip-text text-transparent font-bold
            transform transition-transform duration-200 ease-in-out hover:scale-110"
          >
            Đăng nhập
          </Link>
          <RxSlash />
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

const getHeaderIcon = (icon: ReactNode, href: string) => {
  return <Link href={href}>{icon}</Link>;
};

export default HeaderClient;
