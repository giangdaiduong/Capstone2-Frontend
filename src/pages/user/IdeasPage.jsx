import React, { useState } from 'react';
import { REQUESTS, SIDEBAR_ITEMS } from '../../constants';

const logger = {
  info: (message, data) => console.log(`[INFO] ${message}`, data),
  error: (message, data) => console.error(`[ERROR] ${message}`, data),
};

const IdeasPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;
  const totalPages = Math.ceil(REQUESTS.length / requestsPerPage);

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = REQUESTS.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const handlePageChange = (page) => {
    try {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
      logger.info('Page Changed', { page });
    } catch (err) {
      logger.error('Page Change Failed', { error: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Danh mục yêu cầu
        </h1>

        <div className="space-y-4">
          {currentRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {request.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-md text-sm ${
                    request.status === 'Đã xử lý'
                      ? 'bg-green-100 text-green-600'
                      : request.status === 'Đang xử lý'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {request.status}
                </span>
              </div>
              <p className="text-gray-600 mb-1">
                Tên: {request.user} - {request.date}
              </p>
              <p className="text-gray-600">{request.details}</p>
            </div>
          ))}
        </div>

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
  );
};

export default IdeasPage;
