import React, { useState } from 'react';
import { logger } from '../utils/logger';
import { toast, Toaster } from 'sonner'; // Import toast from sonner

const ChangePass = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!oldPassword || !newPassword) {
      toast.error('Vui lòng nhập đầy đủ thông tin.');
      logger.error('Validation Failed', { oldPassword, newPassword });
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    logger.info('Password Change Submitted', { oldPassword, newPassword });
    toast.success('Đổi mật khẩu thành công!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-3xl font-bold text-center mb-2" style={{ color: '#E6A4B4' }}>
        Đổi mật khẩu
      </h2>
      <p className="text-xl text-center mb-6 text-[#3B3486] font-semibold">
        Vui lòng nhập mật khẩu cũ và mật khẩu mới để cập nhật thông tin.
      </p>

      <form
        className="bg-[#FAFAFF] p-8 rounded-xl shadow-xl w-full max-w-md border border-blue-100 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block font-medium mb-1 text-[#3B3486]">
            Mật khẩu cũ <span className="text-red-500">(*)</span>
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? 'text' : 'password'}
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập mật khẩu cũ"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? '🙈' : '👁️'}
            </span>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1 text-[#3B3486]">
            Mật khẩu mới <span className="text-red-500">(*)</span>
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? '🙈' : '👁️'}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3B3486] text-white py-3 rounded-lg hover:bg-[#443C68] transition-all shadow-md mt-2"
        >
          Đổi mật khẩu
        </button>
      </form>

      {/* Toaster for toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
};

export default ChangePass;
