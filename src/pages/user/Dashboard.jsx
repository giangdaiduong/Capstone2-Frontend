import React from 'react';
import { FaLightbulb, FaComments, FaStar } from 'react-icons/fa';

const UserDashboard = () => {
  const stats = [
    { icon: <FaLightbulb />, label: 'Ý tưởng đã đăng', value: '5' },
    { icon: <FaComments />, label: 'Bình luận', value: '12' },
    { icon: <FaStar />, label: 'Đánh giá', value: '4.5' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tổng quan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"
          >
            <div className="text-3xl text-blue-600">{stat.icon}</div>
            <div>
              <p className="text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Ý tưởng gần đây
        </h2>
        <div className="space-y-4">
          {/* Add your recent ideas list here */}
          <p className="text-gray-600">Chưa có ý tưởng nào</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 