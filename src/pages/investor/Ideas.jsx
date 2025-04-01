import React, { useState } from 'react';
import { FaSearch, FaFilter, FaHandshake } from 'react-icons/fa';

const InvestorIdeas = () => {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: 'Ứng dụng quản lý chi tiêu',
      description: 'Ứng dụng giúp người dùng theo dõi và quản lý chi tiêu hàng ngày...',
      author: 'Nguyễn Văn A',
      category: 'Công nghệ',
      investmentNeeded: '100M VNĐ',
      status: 'Đang tìm nhà đầu tư',
      createdAt: '2024-03-15',
    },
    // Add more mock data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Công nghệ', 'Y tế', 'Giáo dục', 'Thương mại'];

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ý tưởng đầu tư</h1>

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

        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'Tất cả' : category}
              </option>
            ))}
          </select>
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
                  <span>Vốn cần: {idea.investmentNeeded}</span>
                  <span>Trạng thái: {idea.status}</span>
                  <span>Ngày đăng: {idea.createdAt}</span>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                <FaHandshake />
                <span>Đầu tư</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">Không tìm thấy ý tưởng phù hợp</p>
        </div>
      )}
    </div>
  );
};

export default InvestorIdeas; 