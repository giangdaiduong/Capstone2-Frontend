import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Truy cập bị từ chối
        </h1>
        <p className="text-gray-600 mb-6">
          Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản phù hợp.
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized; 