import React, { useState } from 'react';
import { logger } from '../utils/logger';

const ChangePass = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!oldPassword || !newPassword) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      logger.error('Validation Failed', { oldPassword, newPassword });
      return;
    }
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    logger.info('Password Change Submitted', { oldPassword, newPassword });
    setError('');
    alert('Đổi mật khẩu thành công!');
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-pink-500 mb-2">ĐỔI MẬT KHẨU</h2>
      <p className="text-gray-600 mb-6">
        Vui lòng nhập mật khẩu cũ và mật khẩu mới để cập nhật thông tin.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="old-password"
            className="block text-left text-gray-700 font-medium mb-1"
          >
            Mật khẩu cũ <span className="text-red-500">[*]</span>
          </label>
          <input
            id="old-password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Nhập mật khẩu cũ"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="new-password"
            className="block text-left text-gray-700 font-medium mb-1"
          >
            Mật khẩu mới <span className="text-red-500">[*]</span>
          </label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePass;
