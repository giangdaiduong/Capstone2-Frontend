import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/httpRequest';
import { Link } from 'react-router-dom';
import HeaderIdea from '../../components/HeaderIdea';

const logger = {
  info: (message, data) => console.log(`[INFO] ${message}`, data),
  error: (message, data) => console.error(`[ERROR] ${message}`, data),
};

const IdeasPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const requestsPerPage = 5;

  const fetchIdeas = async (pageIndex) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/client/Ideas`, {
        params: {
          PageIndex: pageIndex - 1,
          PageSize: requestsPerPage,
        },
      });
      const data = response.data;
      setIdeas(data.items);
      setTotalPages(Math.ceil(data.total / requestsPerPage));
      logger.info('Fetched Ideas', data);
    } catch (err) {
      logger.error('Fetch Ideas Failed', { error: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
        <HeaderIdea /> {/* ✅ Header áp dụng cho trang này */}
    <div className="min-h-screen bg-gray-100 flex">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Danh mục ý tưởng
        </h1>

        {loading ? (
          <div className="text-center text-gray-600">Đang tải dữ liệu...</div>
        ) : (
          <div className="space-y-6">
            {ideas.length > 0 ? (
              ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500"
                >
                  <div className="flex justify-between items-center mb-2">
                    <Link to={`/user/ideas/${idea.id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                        {idea.title}
                      </h3>
                    </Link>
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        idea.status === 'New'
                          ? 'bg-green-100 text-green-600'
                          : idea.status === 'Approved'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {idea.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600 text-sm">
                    <p><strong>Người khởi tạo:</strong> {idea.initiator || 'Ẩn danh'}</p>
                    <p><strong>Danh mục:</strong> {idea.category}</p>
                    <p><strong>Giá:</strong> {idea.isForSale ? `${idea.price} đ` : 'Không bán'}</p>
                    <p><strong>Đầu tư bởi:</strong> {idea.investor || 'Chưa có'}</p>
                    <p><strong>Ngày đầu tư:</strong> {idea.investmentDate ? new Date(idea.investmentDate).toLocaleString() : 'Chưa có'}</p>
                    <p><strong>Lượt xem:</strong> {idea.totalViews}</p>
                    <p><strong>Lượt thích:</strong> {idea.totalLikes}</p>
                    <p><strong>Bình luận:</strong> {idea.totalComments}</p>
                    <p><strong>Đánh giá:</strong> {idea.totalRatings}</p>
                    <p><strong>Bản quyền:</strong> {idea.copyrightStatus ? 'Đã đăng ký' : 'Chưa đăng ký'}</p>
                    <p><strong>Ngày tạo:</strong> {new Date(idea.createdOn).toLocaleString()}</p>
                  </div>

                  <div className="mt-4 text-gray-700">
                    <strong>Mô tả:</strong> {idea.description}
                  </div>

                  <div className="mt-4">
                    <Link 
                      to={`/user/ideas/${idea.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Xem chi tiết &rarr;
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600">Không có ý tưởng nào.</div>
            )}
          </div>
        )}

        {/* Pagination */}
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
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
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

export default IdeasPage;