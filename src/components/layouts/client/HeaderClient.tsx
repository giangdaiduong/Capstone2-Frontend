'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import { FaStore, FaUserPlus, FaUsers, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import linkTo from '@/utils/linkTo';

function HeaderClient() {
  const [activeIcon, setActiveIcon] = useState('home');

  const iconStyle = (iconName: string) =>
    `${
      activeIcon === iconName ? 'text-[#1A2B88] border-b-2 border-[#1A2B88]' : 'text-gray-600'
    } text-2xl pb-1 cursor-pointer`;

  return (
    <header className="bg-white shadow-md py-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Image src={Logo} alt="Ideax Logo" className="h-10 w-auto" />
      </div>
      <nav className="flex space-x-8">
        {getHeaderIcon(<FaHome className={iconStyle('home')} />, linkTo.home)}
        {getHeaderIcon(<FaUserPlus className={iconStyle('userplus')} />, '/user-plus')}
        {getHeaderIcon(<FaStore className={iconStyle('store')} />, '/store')}
        {getHeaderIcon(<FaUsers className={iconStyle('users')} />, '/users')}
      </nav>
    </header>
  );
}

const getHeaderIcon = (icon: ReactNode, href: string) => {
  return <Link href={href}>{icon}</Link>;
};

export default HeaderClient;
