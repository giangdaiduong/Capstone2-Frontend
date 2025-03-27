import React, { useState } from 'react';
import { validateOTP } from '../utils/validation';
import { logger } from '../utils/logger';
import { NOTIFICATIONS } from '../constants';
import Noti from '../utils/Noti';

const ForgotPass = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const validationError = validateOTP(otp);
      if (validationError) {
        setError(validationError);
        logger.error('OTP Validation Failed', { otp, error: validationError });
        return;
      }

      logger.info('OTP Submitted Successfully', { otp });
      setError('');
      alert('OTP xác nhận thành công!'); // Thay bằng API call thực tế
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      logger.error('OTP Submission Failed', { error: err.message });
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-pink-500 mb-2">
        QUÊN MẬT KHẨU
      </h2>
      <p className="text-gray-600 mb-6">
        Chào mừng bạn! Nhập email của bạn. Vui lòng nhập email để xác nhận.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="otp"
            className="block text-left text-gray-700 font-medium mb-1"
          >
            Nhập mã OTP <span className="text-red-500">[*]</span>
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Nhập mã OTP"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Kích hoạt
        </button>

        <p className="text-sm text-blue-600 hover:underline cursor-pointer">
          Gửi lại mã OTP
        </p>
      </form>
      <Noti notifications={NOTIFICATIONS} />
    </div>
  );
};

export default ForgotPass;
