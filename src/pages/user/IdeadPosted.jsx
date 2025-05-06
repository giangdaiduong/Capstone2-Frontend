import React, { useState } from 'react';
import { REQUESTS } from '../../constants';
import HeaderIdea from '../../components/HeaderIdea';
import { useNavigate } from 'react-router-dom';
import { FaComment, FaStar } from 'react-icons/fa';

const IdeaPosted = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;
  const totalPages = Math.ceil(REQUESTS.length / requestsPerPage);

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = REQUESTS.slice(indexOfFirstRequest, indexOfLastRequest);

  const navigate = useNavigate();

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Đã duyệt':
        return 'bg-green-100 text-green-600';
      case 'Đang đợi xét duyệt':
        return 'bg-yellow-100 text-yellow-600';
      case 'Không được xét duyệt':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <>
      <HeaderIdea />
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Danh sách ý tưởng đã đăng
            </h1>
            <button
              onClick={() => navigate('/user/ideas/create')}
              className="bg-[#1A2B88] text-white px-4 py-2 rounded-md hover:opacity-90 transition"
            >
              + Đăng bài viết mới
            </button>
          </div>

          {/* Danh sách ý tưởng */}
          <div className="space-y-4">
            {currentRequests.map((idea) => (
              <div
                key={idea.id}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-[#1A2B88]"
              >
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {idea.user} - {idea.date} | <span className="italic">{idea.category}</span>
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-md h-fit ${getStatusStyle(
                      idea.status
                    )}`}
                  >
                    {idea.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">
                  {idea.details}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex space-x-4">
                    <span className="flex items-center">
                      <FaComment className="mr-1" /> {idea.comments || 0} Bình luận
                    </span>
                    <span className="flex items-center">
                      <FaStar className="mr-1 text-yellow-400" /> {idea.ratings || 0} đánh giá
                    </span>
                  </div>
                  <div className="space-x-3">
                    <button
                      onClick={() => navigate(`/user/ideas/${idea.id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => navigate(`/user/ideas/${idea.id}/edit`)}
                      className="text-gray-600 hover:underline"
                    >
                      Chỉnh sửa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              &larr;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded-md ${currentPage === index + 1
                  ? 'bg-[#1A2B88] text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              &rarr;
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default IdeaPosted;
