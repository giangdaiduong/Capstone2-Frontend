import React, { useState } from 'react';
import { Mail, User, Phone, Home, Calendar, Lock } from 'lucide-react';
import ModalEmail from '../components/ModalEmail';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    job: '',
    dob: '',
    password: '',
    confirmPassword: '',
    idNumber: '',
    file1: null,
    file2: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl border border-blue-300">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">
          Đăng ký tài khoản
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Hãy đăng ký để bắt đầu sử dụng
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            {
              id: 'fullName',
              label: 'Họ và tên',
              icon: <User className="text-blue-500" />,
              type: 'text',
            },
            {
              id: 'dob',
              label: 'Ngày sinh',
              icon: <Calendar className="text-blue-500" />,
              type: 'date',
            },
            {
              id: 'email',
              label: 'Email',
              icon: <Mail className="text-blue-500" />,
              type: 'email',
            },
            {
              id: 'password',
              label: 'Mật khẩu',
              icon: <Lock className="text-blue-500" />,
              type: 'password',
            },
            {
              id: 'confirmPassword',
              label: 'Xác nhận mật khẩu',
              icon: <Lock className="text-blue-500" />,
              type: 'password',
            },
            {
              id: 'phone',
              label: 'Số điện thoại',
              icon: <Phone className="text-blue-500" />,
              type: 'text',
            },
            {
              id: 'address',
              label: 'Địa chỉ',
              icon: <Home className="text-blue-500" />,
              type: 'text',
            },
            {
              id: 'idNumber',
              label: 'Số CMND',
              icon: <User className="text-blue-500" />,
              type: 'text',
            },
          ].map(({ id, label, icon, type }) => (
            <div key={id} className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {icon}
              </span>
              <input
                id={id}
                type={type}
                name={id}
                value={formData[id]}
                onChange={handleInputChange}
                placeholder={label}
                className="w-full pl-10 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md"
          >
            Đăng ký
          </button>
        </form>
      </div>
      <ModalEmail isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Register;
