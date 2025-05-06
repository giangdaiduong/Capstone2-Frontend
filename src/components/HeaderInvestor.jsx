import React from 'react';
import Logo from '../assets/logo.png';
import { Bell, User } from 'lucide-react';

const HeaderInvestor = () => (
  <header className="bg-white shadow-md p-4 flex justify-between items-center">
    <div className="flex items-center">
      <img src={Logo} alt="Ideax Logo" className="h-10 w-auto mr-3" />
    </div>
    <div className="flex items-center gap-6">
      <button className="relative">
        <Bell size={22} className="text-blue-600" />
      </button>
      <button className="flex items-center gap-2">
        <User size={32} className="text-blue-600 rounded-full border border-gray-300 p-1 bg-gray-100" />
      </button>
    </div>
  </header>
);

export default HeaderInvestor;
