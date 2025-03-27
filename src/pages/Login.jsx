import React, { useState } from 'react';
import Background from '../assets/background.png';
import Noti from '../utils/Noti';
import { NOTIFICATIONS } from '../constants';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 p-8">
          <h2 className="text-xl font-semibold text-pink-500 mb-2 text-center">
            ĐĂNG NHẬP
          </h2>
          <p className="text-gray-600 mb-6">
            Vui lòng đăng nhập để tiếp tục sử dụng dịch vụ
          </p>

          <form onSubmit="" className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-left text-gray-700 font-medium mb-1"
              >
                Địa chỉ Email <span className="text-red-500">[*]</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tên đăng nhập hoặc email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-left text-gray-700 font-medium mb-1"
              >
                Mật khẩu <span className="text-red-500">[*]</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-sm text-blue-600 hover:underline cursor-pointer text-right">
              Quên mật khẩu?
            </p>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Đăng nhập
            </button>

            <Link to={'/register'}>
              <p className="text-sm text-blue-600 hover:underline cursor-pointer text-center">
                Đăng ký tài khoản
              </p>
            </Link>
          </form>
        </div>

        <div
          className="w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">IDEAX</span>
          </div>
        </div>
      </div>
      <Noti notifications={NOTIFICATIONS} />
    </main>
  );
};

export default Login;
