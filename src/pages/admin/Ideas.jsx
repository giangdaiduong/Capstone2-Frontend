import React, { useState } from 'react';
import { FaSearch, FaFilter, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Header from '../../components/Header';

const AdminIdeas = () => {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: 'Ứng dụng quản lý chi tiêu',
      description: 'Ứng dụng giúp người dùng theo dõi và quản lý chi tiêu hàng ngày...',
      author: 'Nguyễn Văn A',
      category: 'Công nghệ',
      status: 'pending',
      createdAt: '2024-03-15',
    },
    // Add more mock data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['all', 'Công nghệ', 'Y tế', 'Giáo dục', 'Thương mại'];
  const statuses = ['all', 'pending', 'approved', 'rejected'];

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || idea.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleStatusChange = (ideaId, newStatus) => {
    setIdeas(ideas.map(idea =>
      idea.id === ideaId ? { ...idea, status: newStatus } : idea
    ));
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full">
        <Header />
      </div>
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý ý tưởng</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Tìm kiếm ý tưởng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Tất cả danh mục' : category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'Tất cả trạng thái' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredIdeas.map((idea) => (
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
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>Tác giả: {idea.author}</span>
                    <span>Danh mục: {idea.category}</span>
                    <span>Ngày đăng: {idea.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {idea.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(idea.id, 'approved')}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleStatusChange(idea.id, 'rejected')}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  idea.status === 'approved' ? 'bg-green-100 text-green-800' :
                  idea.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {idea.status === 'approved' ? 'Đã duyệt' :
                   idea.status === 'rejected' ? 'Từ chối' :
                   'Chờ duyệt'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredIdeas.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">Không tìm thấy ý tưởng nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminIdeas; 