import React, { useState } from 'react';
import { Mail, User, Phone, Home, Calendar, Lock, Upload } from 'lucide-react';
import { registerUser } from '../api/userApi';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';
import HeaderIdea from '../components/HeaderIdea'; // ✅ Thêm dòng này

// FileInput component
const FileInput = ({ label, onChange, preview, required = false }) => (
  <div className="space-y-2">
    <label className="block text-blue-700 font-medium">{label}</label>
    <div className="flex items-center space-x-4">
      <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition">
        <Upload className="w-5 h-5 mr-2" />
        Chọn ảnh
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
          required={required}
        />
      </label>

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-20 object-cover rounded-lg border border-gray-300 shadow hover:scale-105 transition-transform"
          />
        </div>
      )}
    </div>
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    idNumber: '',
    cccdFront: null,
    cccdBack: null,
    avatar: null,
    roleId: '',
    birthday: '',
    phone: '',
    address: '',
    isDeleted: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, [field]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        FullName: formData.fullName,
        Username: formData.username,
        Email: formData.email,
        Password: formData.password,
        ConfirmPassword: formData.confirmPassword,
        CCCD: formData.idNumber,
        CCCDBack: formData.cccdBack,
        CCCDFront: formData.cccdFront,
        Avatar: formData.avatar,
        RoleId: formData.roleId,
        Birthday: formData.birthday,
        Phone: formData.phone,
        Address: formData.address,
        CreatedBy: formData.createdBy,
        IsDeleted: formData.isDeleted,
      };
      await registerUser(payload);
      navigate('/verify-otp');
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực OTP.');
    } catch (err) {
      toast.error('Đăng ký thất bại: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <HeaderIdea /> {/* ✅ Chèn header như Home */}

      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-5">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl border border-blue-300">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">Đăng ký tài khoản</h2>
          <p className="text-gray-500 text-center mb-6">Hãy đăng ký để bắt đầu sử dụng</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              { name: 'fullName', icon: <User />, placeholder: 'Họ và tên' },
              { name: 'username', icon: <User />, placeholder: 'Tên đăng nhập' },
              { name: 'email', type: 'email', icon: <Mail />, placeholder: 'Email' },
              { name: 'password', type: 'password', icon: <Lock />, placeholder: 'Mật khẩu' },
              { name: 'confirmPassword', type: 'password', icon: <Lock />, placeholder: 'Xác nhận mật khẩu' },
              { name: 'idNumber', icon: <User />, placeholder: 'Số CCCD' },
              { name: 'phone', icon: <Phone />, placeholder: 'Số điện thoại' },
              { name: 'address', icon: <Home />, placeholder: 'Địa chỉ' },
            ].map(({ name, type = 'text', icon, placeholder }) => (
              <div key={name} className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  {React.cloneElement(icon, { className: 'text-blue-500' })}
                </span>
                <input
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className={`w-full pl-10 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  required
                />
              </div>
            ))}

            {/* Dropdown vai trò */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <User className="text-blue-500" />
              </span>
              <select
                name="roleId"
                value={formData.roleId}
                onChange={handleInputChange}
                className="w-full pl-10 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                required
              >
                <option value="">Chọn vai trò</option>
                <option value="ideator">Ý tưởng viên</option>
                <option value="investor">Nhà đầu tư</option>
              </select>
            </div>

            {/* Ngày sinh */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Calendar className="text-blue-500" />
              </span>
              <input
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleInputChange}
                className="w-full pl-10 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Upload CCCD */}
            <FileInput
              label="Ảnh CCCD mặt trước"
              onChange={(e) => handleFileChange(e, 'cccdFront')}
              preview={formData.cccdFront}
              required
            />
            <FileInput
              label="Ảnh CCCD mặt sau"
              onChange={(e) => handleFileChange(e, 'cccdBack')}
              preview={formData.cccdBack}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md"
            >
              Đăng ký
            </button>
          </form>
        </div>
        <Toaster position="top-right" richColors closeButton />
      </div>
    </>
  );
};

export default Register;
