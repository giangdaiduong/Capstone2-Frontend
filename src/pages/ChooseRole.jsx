// src/pages/ChooseRole.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

const ChooseRole = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🛠 Dùng đúng roleId từ DB:
  const roles = [
    {
      id: '50f44159-1626-4ae2-8a67-3118b373070b', // Founder → Người dùng thường
      roleName: 'Founder',
      displayName: 'Ý tưởng viên',
    },
    {
      id: 'f8d5bfbd-6dad-430b-9186-c9f291d8b8c7', // Investor → Nhà đầu tư
      roleName: 'Investor',
      displayName: 'Nhà đầu tư',
    },
  ];

  const handleChoose = (roleId) => {
    navigate(`/register?roleId=${roleId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center space-y-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600">Bạn là ai?</h2>
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleChoose(role.id)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Tôi là {role.displayName}
          </button>
        ))}
        <Toaster position="top-right" richColors />
      </div>
    </div>
  );
};

export default ChooseRole;
