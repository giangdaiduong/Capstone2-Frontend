import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const UserIdeas = () => {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: 'Ứng dụng quản lý chi tiêu',
      description: 'Ứng dụng giúp người dùng theo dõi và quản lý chi tiêu hàng ngày...',
      status: 'Đang chờ duyệt',
      createdAt: '2024-03-15',
    },
    // Add more mock data as needed
  ]);

  const handleDelete = (id) => {
    setIdeas(ideas.filter((idea) => idea.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ý tưởng của tôi</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <FaPlus />
          <span>Thêm ý tưởng mới</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {idea.title}
                </h2>
                <p className="text-gray-600 mb-4">{idea.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Trạng thái: {idea.status}</span>
                  <span>Ngày tạo: {idea.createdAt}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(idea.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {ideas.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">Bạn chưa có ý tưởng nào</p>
        </div>
      )}
    </div>
  );
};

export default UserIdeas; 