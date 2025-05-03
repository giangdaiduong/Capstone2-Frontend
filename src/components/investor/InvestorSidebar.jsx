import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FaList, 
    FaHistory, 
    FaUsers, 
    FaHome,
    FaRobot,
    FaSearch
} from 'react-icons/fa';

const InvestorSidebar = () => {
    const menuItems = [
        {
            icon: <FaList className="w-5 h-5" />,
            label: 'Danh sách ý tưởng',
            path: '/investor/ideas'
        },
        {
            icon: <FaHistory className="w-5 h-5" />,
            label: 'Lịch sử quan tâm',
            path: '/investor/history'
        },
        {
            icon: <FaUsers className="w-5 h-5" />,
            label: 'Cộng đồng',
            path: '/investor/community'
        },
        {
            icon: <FaHome className="w-5 h-5" />,
            label: 'Hồ sơ Nhà đầu tư',
            path: '/investor/profile'
        },
        {
            icon: <FaRobot className="w-5 h-5" />,
            label: 'Chat AI hỗ trợ',
            path: '/investor/chat'
        },
        {
            icon: <FaSearch className="w-5 h-5" />,
            label: 'Tìm ý tưởng thông minh',
            path: '/investor/search'
        }
    ];

    return (
        <div className="w-64 bg-white shadow-lg h-screen">
            <nav className="mt-4">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-[#0A2273] transition-colors ${
                                isActive ? 'bg-blue-50 text-[#0A2273] border-l-4 border-[#0A2273]' : ''
                            } ${item.label === 'Tìm ý tưởng thông minh' ? 'text-[#0A2273]' : ''}`
                        }
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default InvestorSidebar;