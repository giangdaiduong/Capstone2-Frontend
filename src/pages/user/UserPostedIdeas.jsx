import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaTag, FaThumbsUp, FaComment, FaImage } from 'react-icons/fa';
import HeaderIdea from '../../components/HeaderIdea';

const UserPostedIdeas = () => {
  const [newPost, setNewPost] = useState('');
  const [postedIdeas] = useState([
    {
      id: 1,
      title: "Hệ Thống Gia Sư AI Cá Nhân Hóa",
      author: "Nguyễn Văn A",
      date: "10 tháng 2, 2025",
      categories: ["Giáo dục", "Công nghệ"],
      description: "Ứng dụng này sử dụng trí tuệ nhân tạo để phân tích cách học của từng học sinh...",
      likes: 20,
      comments: [],
      rating: 4.6,
      ratingCount: 15,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header full width - không bị ảnh hưởng bởi max-w */}
      <div className="w-full">
        <HeaderIdea />
      </div>

      {/* Nội dung chính căn giữa */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Danh sách ý tưởng đã đăng</h2>
        {/* Các nội dung khác bạn có thể thêm ở đây */}
      </div>
    </div>
  );
};

export default UserPostedIdeas;
