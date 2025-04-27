import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={Logo} alt="Ideax Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold text-blue-600">IDEAX</span>
      </div>

      <nav className="flex space-x-4">
        <Link to="/" className="text-gray-600 hover:text-blue-600">
          Trang Chủ
        </Link>
        <Link to="/san-pham" className="text-gray-600 hover:text-blue-600">
          Sản Phẩm
        </Link>
        <Link to="/cong-dong" className="text-gray-600 hover:text-blue-600">
          Cộng Đồng
        </Link>
        <Link to="/dich-vu" className="text-gray-600 hover:text-blue-600">
          Các dịch vụ khác
        </Link>
      </nav>

      <div className="text-gray-600">
        <Link to="/login" className="hover:text-blue-600">
          Đăng nhập
        </Link>
      </div>
    </header>
  );
};

export default Header;
