// src/components/HeaderIdea.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { FaHome, FaUserPlus, FaStore, FaUsers, FaGamepad, FaTh, FaComments, FaBell } from 'react-icons/fa';

const HeaderIdea = () => {
  const [open, setOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState('home');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleStoreClick = () => {
    setActiveIcon('store');
    navigate('/user/ideas/posted');
  };

  const iconStyle = (iconName) =>
    `${activeIcon === iconName ? 'text-[#1A2B88] border-b-2 border-[#1A2B88]' : 'text-gray-600'} text-2xl pb-1 cursor-pointer`;

  return (
    <header className="bg-white shadow-md py-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Ideax Logo" className="h-10 w-auto" />
      </div>

      <nav className="flex space-x-8">
        <FaHome
          className={iconStyle('home')}
          onClick={() => {
            setActiveIcon('home');
            navigate('/');
          }}
        />
        <FaUserPlus
          className={iconStyle('userplus')}
          onClick={() => setActiveIcon('userplus')}
        />
        <FaStore
          className={iconStyle('store')}
          onClick={handleStoreClick}
        />
        <FaUsers
          className={iconStyle('users')}
          onClick={() => setActiveIcon('users')}
        />
      </nav>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <FaComments className="text-gray-600 text-xl" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">2</span>
        </div>
        <FaBell className="text-gray-600 text-xl" />
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          ></div>
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => { setOpen(false); navigate('/user/profile'); }}
              >
                Quản lý tài khoản
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => { setOpen(false); navigate('/user/change-password'); }}
              >
                Đổi mật khẩu
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderIdea;
