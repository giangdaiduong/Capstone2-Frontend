import React from 'react';
import { FaUsers, FaLightbulb, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  const stats = [
    { icon: <FaUsers />, label: 'Tổng số người dùng', value: '1,234' },
    { icon: <FaLightbulb />, label: 'Ý tưởng đã đăng', value: '567' },
    { icon: <FaMoneyBillWave />, label: 'Tổng vốn đầu tư', value: '10B VNĐ' },
    { icon: <FaChartLine />, label: 'Tăng trưởng', value: '+25%' },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      action: 'Đăng ký mới',
      user: 'Nguyễn Văn A',
      time: '5 phút trước',
    },
    {
      id: 2,
      type: 'idea',
      action: 'Đăng ý tưởng mới',
      user: 'Trần Thị B',
      time: '15 phút trước',
    },
    {
      id: 3,
      type: 'investment',
      action: 'Đầu tư mới',
      user: 'Lê Văn C',
      time: '1 giờ trước',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tổng quan hệ thống</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Hoạt động gần đây
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
              >
                <div className="text-blue-600">
                  {activity.type === 'user' && <FaUsers />}
                  {activity.type === 'idea' && <FaLightbulb />}
                  {activity.type === 'investment' && <FaMoneyBillWave />}
                </div>
                <div>
                  <p className="text-gray-800">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Thống kê hoạt động
          </h2>
          <div className="h-64 flex items-center justify-center">
            {/* Add your chart component here */}
            <p className="text-gray-600">Biểu đồ thống kê sẽ được hiển thị ở đây</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 