import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FaList, 
    FaHistory, 
    FaUsers, 
    FaHome,
    FaRobot,
    FaCog 
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
            label: 'Hỗ sơ Nhà đầu tư',
            path: '/investor/profile'
        },
        {
            icon: <FaRobot className="w-5 h-5" />,
            label: 'Chat AI hỗ trợ',
            path: '/investor/chat'
        }
       
    ];

    const handleCreateGroup = (group) => {
        setConversations(prev => [group, ...prev]);
        setSelectedConversation(group);
    };

    const filteredConversations = useMemo(() => {
        return conversations.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    }, [search, conversations]);

    return (
        <div className="w-64 bg-white shadow-lg">
            <div className="p-4">
                <h1 className="text-xl font-bold text-blue-800">InvestHub</h1>
            </div>
            <nav className="mt-4">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-800 transition-colors ${
                                isActive ? 'bg-blue-50 text-blue-800 border-l-4 border-blue-800' : ''
                            }`
                        }
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="absolute bottom-0 w-64 p-4">
                <NavLink
                    to="/investor/settings"
                    className="flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                >
                    <FaCog className="w-5 h-5 mr-3" />
                    <span>Cài đặt</span>
                </NavLink>
            </div>
        </div>
    );
};

export default InvestorSidebar; 