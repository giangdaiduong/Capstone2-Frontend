import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaLightbulb } from 'react-icons/fa';

const UserSidebar = () => {
  const menuItems = [
    { path: '/user/dashboard', icon: <FaHome />, label: 'Tổng quan' },
    { path: '/user/profile', icon: <FaUser />, label: 'Thông tin cá nhân' },
    { path: '/user/ideas', icon: <FaLightbulb />, label: 'Ý tưởng của tôi' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">IDEAX</h2>
        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default UserSidebar; 