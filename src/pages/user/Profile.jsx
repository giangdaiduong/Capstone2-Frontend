import React, { useState, useEffect } from 'react';
import HeaderIdea from '../../components/HeaderIdea';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const defaultAvatar =
  'https://www.w3schools.com/howto/img_avatar.png'; // Ảnh mặc định

const roleOptions = [
  { id: 'ideator', label: 'Ý tưởng viên' },
  { id: 'investor', label: 'Nhà đầu tư' }
];

const ROLE_ID_MAP = {
  ideator: 'uuid-cua-ideator',   // thay bằng UUID thật từ BE
  investor: 'uuid-cua-investor', // thay bằng UUID thật từ BE
};

const UserProfile = () => {
  const [profile, setProfile] = useState({
    username: 'Văn A',
    email: 'nguyenvana@gmail.com',
    phone: '0123456789',
    birthday: '2003-02-01',
    address: '01 Quang Trung',
    role: 'Ý tưởng viên',
    createdAt: '2024-01-01',
    updatedAt: '2025-03-10',
  });
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        // ... các trường khác ...
        RoleId: ROLE_ID_MAP[profile.roleId],
        // ...
      };
      await axios.put('/v1/api/user/update', payload);
      // ... chuyển hướng theo vai trò ...
      if (profile.roleId === 'ideator') {
        navigate('/user/ideas/posted');
      } else {
        navigate('/investor/dashboard');
      }
    } catch (err) {
      toast.error('Đăng ký thất bại: ' + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get('/v1/api/admin/Roles');
        setRoles(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setRoles([]); // Đảm bảo roles luôn là mảng
        toast.error('Không thể tải danh sách vai trò');
        console.error('Lỗi load roles:', err);
      }
    };
    fetchRoles();
  }, []);

  return (
    <>
      <HeaderIdea />
      <div className="p-6 flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 border w-[600px]">
          <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
          <form onSubmit={handleSubmit} className="flex">
            {/* Form bên trái */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center">
                <label className="w-40 font-semibold text-gray-700">Họ và Tên</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md"
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 font-semibold text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md"
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 font-semibold text-gray-700">Số điện thoại:</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md"
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 font-semibold text-gray-700">Ngày sinh:</label>
                <input
                  type="date"
                  name="birthday"
                  value={profile.birthday}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md"
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 font-semibold text-gray-700">Địa chỉ:</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md"
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 font-semibold text-gray-700">Vai trò:</label>
                <select
                  name="roleId"
                  value={profile.role}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                  required
                >
                  <option value="">Chọn vai trò</option>
                  {roleOptions.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-40 font-semibold text-gray-700">Ngày tạo tài khoản:</label>
                <input
                  type="date"
                  value={profile.createdAt}
                  disabled
                  className="flex-1 p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 font-semibold text-gray-700">Ngày cập nhật gần nhất:</label>
                <input
                  type="date"
                  value={profile.updatedAt}
                  disabled
                  className="flex-1 p-2 border rounded-md bg-gray-100"
                />
              </div>
            </div>
            {/* Avatar bên phải */}
            <div className="ml-8 flex flex-col items-center">
              <div className="w-32 h-32 rounded bg-gray-100 border flex items-center justify-center overflow-hidden mb-2 relative">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-2 right-2 bg-white rounded-full p-1 cursor-pointer border shadow"
                  title="Tải ảnh lên"
                >
                  <svg width="20" height="20" fill="gray" viewBox="0 0 20 20">
                    <path d="M16.7 10.8c-.4 0-.7.3-.7.7v3.5c0 .6-.5 1-1 1H5c-.6 0-1-.5-1-1v-3.5c0-.4-.3-.7-.7-.7s-.7.3-.7.7v3.5c0 1.4 1.1 2.5 2.5 2.5h10c1.4 0 2.5-1.1 2.5-2.5v-3.5c0-.4-.3-.7-.7-.7zM10.7 11.7c.2.2.5.2.7 0l2.1-2.1c.3-.3.3-.7 0-1-.3-.3-.7-.3-1 0l-1 1V4.5c0-.4-.3-.7-.7-.7s-.7.3-.7.7v5.1l-1-1c-.3-.3-.7-.3-1 0-.3.3-.3.7 0 1l2.1 2.1z"/>
                  </svg>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </form>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              form="profile-form"
              className="px-6 py-2 bg-[#1A2B88] text-white rounded hover:bg-[#16205c] transition"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile; 