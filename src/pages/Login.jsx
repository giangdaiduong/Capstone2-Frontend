import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Background from '../assets/background.png';
import Noti from '../utils/Noti';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateForm } from '../utils/validation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Hàm giải mã JWT token
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const loginMutation = useMutation({
    mutationFn: async () => {
      try {
        console.log('Sending login request with:', { username, password });
        
        const response = await axios.post('http://localhost:5182/v1/api/client/Auth', {
          userName: username,
          password
        });
        
        console.log('Login response:', response.data);
        
        const { token, user } = response.data;
        
        if (!token) {
          throw new Error('Token không được trả về từ server');
        }
        
        // Lưu token vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Giải mã token để lấy role
        const decodedToken = parseJwt(token);
        console.log('Decoded token full structure:', decodedToken);
        
        // Thử tất cả các khả năng để lấy role
        const possibleRoleKeys = [
          'role',
          'Role',
          'roleName',
          'RoleName',
          'roles',
          'Roles',
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
          'userRole',
          'UserRole'
        ];
        
        let roleName = null;
        for (const key of possibleRoleKeys) {
          if (decodedToken[key]) {
            roleName = decodedToken[key];
            console.log('Found role in key:', key, 'value:', roleName);
            break;
          }
        }
        
        // Nếu không tìm thấy role, thử tìm trong claims nếu có
        if (!roleName && decodedToken.claims) {
          console.log('Searching in claims:', decodedToken.claims);
          for (const key of possibleRoleKeys) {
            if (decodedToken.claims[key]) {
              roleName = decodedToken.claims[key];
              console.log('Found role in claims with key:', key, 'value:', roleName);
              break;
            }
          }
        }

        // Nếu vẫn không tìm thấy, kiểm tra toàn bộ cấu trúc token
        if (!roleName) {
          console.log('Could not find role in standard locations. Full token structure:', JSON.stringify(decodedToken, null, 2));
          throw new Error('Không thể xác định quyền người dùng. Vui lòng liên hệ admin.');
        }
        
        localStorage.setItem('role', roleName);
        
        // Hiển thị thông báo thành công
        toast.success('Đăng nhập thành công!');
        
        // Điều hướng dựa vào roleName
        switch (roleName.toLowerCase()) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'investor':
            navigate('/investor/danh-sach-y-tuong');
            break;
          case 'initiator':
            navigate('/initiator/list-of-ideas');
            break;
          default:
            console.log('Unknown role:', roleName);
            navigate('/');
            break;
        }
      } catch (error) {
        console.error('Login error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        const errorMessage = error.response?.data?.message 
          || error.response?.data?.title
          || error.message 
          || 'Đăng nhập thất bại';
          
        throw new Error(errorMessage);
      }
    },
    onError: (error) => {
      setNotifications([
        { isSuccess: false, message: error.message },
      ]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotifications([]);

    // Validate form
    const validationError = validateForm(username, password);
    if (validationError) {
      setNotifications([{ isSuccess: false, message: validationError }]);
      return;
    }

    // Attempt login
    setIsLoading(true);
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập vào tài khoản của bạn
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Tên đăng nhập
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="h-5 w-5 text-gray-400"
                />
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
      <Noti notifications={notifications} />
    </div>
  );
};

export default Login;
