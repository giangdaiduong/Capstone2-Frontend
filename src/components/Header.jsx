import React from 'react';
import Logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={Logo} alt="Ideax Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold text-blue-600">IDEAX</span>
      </div>

      <nav className="flex space-x-4">
        <a href="#" className="text-gray-600 hover:text-blue-600">
          Trang Chủ
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-600">
          Sản Phẩm
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-600">
          Cộng Đồng
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-600">
          Các dịch vụ khác
        </a>
      </nav>

      <div className="text-gray-600">
        <span>Đăng ký/Đăng nhập</span>
      </div>
    </header>
  );
};

export default Header;
