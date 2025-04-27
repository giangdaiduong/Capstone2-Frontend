import axiosInstance from '../utils/httpRequest';

// Đăng ký user mới
export const registerUser = (data) => axiosInstance.post('/client/users', data);

// Xác thực OTP
export const verifyOtp = (data) => axiosInstance.post('/client/Users/verify-otp', data);

// Lấy thông tin user theo id (param)
export const getUserInfo = (id) => axiosInstance.get(`/client/users/${id}`);

// Lấy thông tin user theo id (query)
export const getUserById = (id) => axiosInstance.get('/client/users/get-by-id', { params: { id } });

// Cập nhật thông tin user
export const updateUser = (id, data) => axiosInstance.patch(`/client/users/${id}`, data);

// Quên mật khẩu
export const forgotPassword = (email) => axiosInstance.post('/client/users/forgot-password', null, { params: { email } });

// Đặt lại mật khẩu
export const resetPassword = (otp, password, confirmPassword) =>
    axiosInstance.patch('/client/users/reset-password', null, {
        params: { otp, password, confirmPassword }
    });

// Lấy tất cả user (có phân trang/filter)
export const getAllUsers = (params) => axiosInstance.get('/client/users', { params });

// Tạo/cập nhật investor preferences
export const createInvestorPreferences = (data) => axiosInstance.patch('/client/users', data);
