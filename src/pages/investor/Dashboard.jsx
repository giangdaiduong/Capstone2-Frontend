import React from 'react';
import { FaLightbulb, FaMoneyBillWave, FaChartLine, FaUsers } from 'react-icons/fa';

const InvestorDashboard = () => {
  const stats = [
    { icon: <FaLightbulb />, label: 'Ý tưởng đã đầu tư', value: '8' },
    { icon: <FaMoneyBillWave />, label: 'Tổng vốn đầu tư', value: '500M VNĐ' },
    { icon: <FaChartLine />, label: 'Lợi nhuận', value: '+15%' },
    { icon: <FaUsers />, label: 'Đối tác', value: '12' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tổng quan</h1>
      
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
            Dự án đầu tư gần đây
          </h2>
          <div className="space-y-4">
            {/* Add your recent investments list here */}
            <p className="text-gray-600">Chưa có dự án đầu tư nào</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Biểu đồ hiệu suất
          </h2>
          <div className="h-64 flex items-center justify-center">
            {/* Add your chart component here */}
            <p className="text-gray-600">Biểu đồ sẽ được hiển thị ở đây</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard; 