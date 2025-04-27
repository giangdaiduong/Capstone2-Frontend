import React from 'react';
import IconTotalPost from '../../assets/img/IconTotalPost.png';
import IconPremiumUsers from '../../assets/img/IconPremiumUsers.png';
import IconIvest from '../../assets/img/IconIvest.png';
import IconIdeaUsers from '../../assets/img/IconIdeaUsers.png';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

  const stats = [
  {
    title: "Tổng bài viết",
    value: "256 bài viết",
    description: "Chưa bao gồm bài chưa xét duyệt",
    color: "#FBE7A2",
    border: "border-[#FBE7A2]",
    iconBg: "bg-[#FBE7A2]",
    icon: <img src={IconTotalPost} alt="Tổng bài viết" className="w-14 h-14 object-contain" />
  },
  {
    title: "Người dùng Premium",
    value: "400 người",
    description: "Người dùng nâng cấp Premium",
    color: "#4B6CD1",
    border: "border-[#4B6CD1]",
    iconBg: "bg-[#4B6CD1]",
    icon: <img src={IconPremiumUsers} alt="Premium Users" className="w-20 h-20 object-contain" />
  },
  {
    title: "Nhà đầu tư",
    value: "142 Nhà đầu tư",
    description: "Tài khoản có vai trò Nhà đầu tư",
    color: "#7B88B6",
    border: "border-[#7B88B6]",
    iconBg: "bg-[#233A8C]",
    icon: <img src={IconIvest} alt="Nhà đầu tư" className="w-20 h-20 object-contain" />
  },
  {
    title: "Ý tưởng viên",
    value: "635 user",
    description: "Tài khoản có vai trò Ý tưởng viên",
    color: "#E6B6B6",
    border: "border-[#E6B6B6]",
    iconBg: "bg-[#C46B6B]",
    icon: <img src={IconIdeaUsers} alt="Ý tưởng viên" className="w-20 h-20 object-contain" />
  }
];

const StatCard = ({ title, value, description, color, border, icon }) => (
  <div className={`relative flex flex-col items-center justify-center rounded-xl border ${border} bg-white py-6 px-4 min-h-[220px] transition-shadow shadow-sm`}
    style={{ borderWidth: 2 }}
  >
    <div className="text-center mb-2">
      <div className="font-bold text-xl mb-1">{title}</div>
      <div className="font-bold text-xl mb-1">{value}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
    <div className="mt-4 mb-2 flex items-center justify-center">
      <div className="rounded-full flex items-center justify-center" style={{ background: color, width: 70, height: 70 }}>
        {icon}
      </div>
    </div>
    {/* Tam giác vuông góc phải dưới, cách viền 8px */}
    <div style={{
      position: 'absolute',
      right: '8px', // cách viền phải 8px
      bottom: '8px', // cách viền dưới 8px
      width: 0,
      height: 0,
      borderLeft: '32px solid transparent',
      borderTop: `32px solid ${color}`,
      borderRight: '0 solid transparent',
      borderBottom: '0 solid transparent',
      zIndex: 2
    }} />
    {/* Viền ngoài cho tam giác */}
    <div style={{
      position: 'absolute',
      right: '4px', // cách viền phải 4px
      bottom: '4px', // cách viền dưới 4px
      width: 0,
      height: 0,
      borderLeft: '36px solid transparent',
      borderTop: `36px solid`,
      borderTopColor: color,
      filter: 'brightness(0.85)',
      zIndex: 1
    }} />
  </div>
);

// Data giả cho Line chart (bài viết ý tưởng theo tháng)
const lineData = {
  labels: [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ],
  datasets: [
    {
      label: 'Ý tưởng Bán/Hợp tác',
      data: [75, 88, 80, 85, 72, 70, 78, 80, 85, 70, 75, 82],
      borderColor: '#2346A8',
      backgroundColor: 'rgba(35,70,168,0.1)',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#2346A8',
      fill: false,
    },
    {
      label: 'Ý tưởng Tìm nhà đầu tư',
      data: [70, 60, 75, 80, 68, 72, 74, 76, 80, 72, 70, 78],
      borderColor: '#F5B6C6',
      backgroundColor: 'rgba(245,182,198,0.1)',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#F5B6C6',
      fill: false,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: { size: 14 },
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 20 },
      grid: { color: '#e5e7eb' },
    },
    x: {
      grid: { color: '#e5e7eb' },
    },
  },
};

// Data giả cho Bar chart (doanh thu theo tháng)
const barData = {
  labels: [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ],
  datasets: [
    {
      label: 'VND',
      data: [2, 4, 6, 8, 5, 7, 10, 8, 6, 5, 4, 6],
      backgroundColor: '#6C2EB5',
      borderRadius: 6,
      barThickness: 24,
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        font: { size: 14 },
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: '#e5e7eb' },
      ticks: {
        callback: function(value) {
          return value + ' tr';
        }
      }
    },
    x: {
      grid: { color: '#e5e7eb' },
    },
  },
};

const Dashboard = () => {
  // Mock data for top ideas
  const topIdeas = Array(5).fill({
    title: 'Bán App ABC',
    rating: '4.8/5',
    likes: 120,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê Bài viết ý tưởng theo tháng</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Danh thu theo tháng</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Top Ideas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top 5 ý tưởng lượt đánh giá cao nhất</h3>
          <div className="divide-y divide-gray-200">
            {topIdeas.map((idea, index) => (
              <div key={index} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-blue-600">{idea.title}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{idea.rating}</span>
                  <span className="text-sm text-gray-500">{idea.likes} lượt thích</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top 5 ý tưởng tìm nhà đầu tư</h3>
          <div className="divide-y divide-gray-200">
            {topIdeas.map((idea, index) => (
              <div key={index} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-pink-600">{idea.title}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{idea.rating}</span>
                  <span className="text-sm text-gray-500">{idea.likes} quan tâm</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 