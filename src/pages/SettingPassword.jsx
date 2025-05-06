import React, { useState } from 'react';
import { resetPassword } from '../api/userApi';
import { toast, Toaster } from 'sonner';
import HeaderIdea from '../components/HeaderIdea'; // ✅ Thêm Header của idea

const SettingPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getOtpFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('otp') || '';
  };
  const [otp] = useState(getOtpFromUrl());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Thiếu mã OTP!');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }
    try {
      await resetPassword(otp, password, confirmPassword);
      toast.success('Đổi mật khẩu thành công!');
    } catch (err) {
      toast.error('Đổi mật khẩu không thành công!');
    }
  };

  return (
    <>
      <HeaderIdea /> {/* ✅ Chèn header idea ở đây */}

      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h2 className="text-3xl font-bold text-center mb-2" style={{ color: '#E6A4B4' }}>
          Cài đặt lại mật khẩu
        </h2>
        <p className="text-xl text-center mb-6 text-[#3B3486] font-semibold">Đặt lại mật khẩu mới</p>

        <form
          className="bg-[#FAFAFF] p-8 rounded-xl shadow-xl w-full max-w-md border border-blue-100 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block font-medium mb-1 text-[#3B3486]">
              Mật khẩu mới <span className="text-red-500">(*)</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#3B3486]">
              Xác nhận mật khẩu mới <span className="text-red-500">(*)</span>
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Vui lòng xác nhận mật khẩu"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#3B3486] text-white py-3 rounded-lg hover:bg-[#443C68] transition-all shadow-md mt-2"
          >
            Thay đổi mật khẩu
          </button>
        </form>

        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default SettingPassword;
