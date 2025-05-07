import React, { useState, useEffect } from 'react';
import { Mail, User, Phone, Home, Calendar, Lock, Upload } from 'lucide-react';
import { registerUser } from '../api/userApi';
import { toast, Toaster } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderIdea from '../components/HeaderIdea';

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
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roleId = queryParams.get('roleId');

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    idNumber: '',
    cccdFront: null,
    cccdBack: null,
    birthday: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (!roleId) {
      toast.error('Vui lòng chọn vai trò trước khi đăng ký.');
      navigate('/');
    }
  }, [roleId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        cccd: formData.idNumber,
        cccdBack: formData.cccdBack,
        cccdFront: formData.cccdFront,
        roleId,
        birthday: new Date(formData.birthday).toISOString(),
        phone: formData.phone,
        address: formData.address,
      };
  
      // Log đầy đủ payload để kiểm tra
      console.log('📦 Payload gửi lên:\n', JSON.stringify(payload, null, 2));
  
      // Gửi request đăng ký
      await registerUser(payload);
  
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực OTP.');
      navigate('/verify-otp');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      toast.error('Đăng ký thất bại: ' + errorMsg);
  
      // Log chi tiết lỗi từ backend (nếu có)
      if (err.response) {
        console.error('❌ Lỗi chi tiết từ backend:', err.response.data);
      } else {
        console.error('❌ Lỗi không rõ từ client:', err);
      }
    }
  };
  

  return (
    <>
      <HeaderIdea />
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
                  className="w-full pl-10 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            ))}

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
