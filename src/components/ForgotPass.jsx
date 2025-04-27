import React, { useState } from 'react';
import { forgotPassword } from '../api/userApi'; // Import the forgotPassword API function
import { toast, Toaster } from 'sonner'; // Import toast for notifications
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
  const [email, setEmail] = useState(''); // Change otp to email
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        setError('Email is required');
        return;
      }

      // Call the forgotPassword API with the email
      const response = await forgotPassword(email);
      if (response.status === 200) {
        navigate('')
        toast.success('Mã OTP đã được gửi đến email của bạn.'); // Notify success
      } else {
        toast.error('Đã có lỗi xảy ra khi gửi mã OTP.');
      }

      setError('');
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      toast.error('Có lỗi khi gửi yêu cầu. Vui lòng thử lại.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg border border-blue-300">
        <h2 className="text-xl font-semibold text-pink-500 mb-2 text-center">
          QUÊN MẬT KHẨU
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Chào mừng bạn! Nhập email để nhận mã OTP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-left text-gray-700 font-medium mb-1"
            >
              Nhập email <span className="text-red-500">[*]</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Gửi mã OTP
          </button>

          <p className="text-sm text-blue-600 hover:underline cursor-pointer text-center">
            Gửi lại mã OTP
          </p>
        </form>
        {/* Display error message */}
        {error && <p className="text-center text-red-500 mt-2">{error}</p>}
      </div>

      {/* Toaster for toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
};

export default ForgotPass;
