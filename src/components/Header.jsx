import React, { useState } from 'react';
import Logo from '../assets/img/Logo.png';
import { Bell, User, MessageCircle } from 'lucide-react';

const Header = () => {
  // Giả lập role, bạn có thể lấy từ localStorage hoặc context thực tế
  const [role] = useState(localStorage.getItem('role') || 'initiator');

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img src={Logo} alt="Ideax Logo" className="h-10 w-auto mr-3" />
        {/* <span className="text-xl font-bold text-blue-600">IDEAX</span> */}
      </div>

      {/* Nội dung theo role */}
      {role === 'admin' && (
        <div className="flex items-center gap-6">
          <button className="relative">
            <Bell size={22} className="text-blue-600" />
            {/* Có thể thêm chấm đỏ thông báo ở đây */}
          </button>
          <button className="flex items-center gap-2">
            <User size={22} className="text-blue-600" />
            <span className="hidden md:inline text-gray-700 font-medium">Admin</span>
          </button>
        </div>
      )}

      {role === 'investor' && (
        <div className="flex items-center gap-6">
          <button className="relative">
            <Bell size={22} className="text-blue-600" />
            {/* Có thể thêm chấm đỏ thông báo ở đây */}
          </button>
          <button className="flex items-center gap-2">
            <User size={32} className="text-blue-600 rounded-full border border-gray-300 p-1 bg-gray-100" />
          </button>
        </div>
      )}

      {role === 'initiator' && (
        <nav className="flex items-center gap-6">
          <a href="/" className="text-gray-600 hover:text-blue-600 font-medium">Trang chủ</a>
          <a href="/danh-sach-y-tuong" className="text-gray-600 hover:text-blue-600 font-medium">Sàn ý tưởng</a>
          <a href="/cong-dong" className="text-gray-600 hover:text-blue-600 font-medium">Cộng đồng</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Các dịch vụ khác</a>
          <a href="/chat-ai-ho-tro" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
            <MessageCircle size={20} /> Chat
          </a>
          <a href="/initiator/profile" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
            <User size={20} /> Profile
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
