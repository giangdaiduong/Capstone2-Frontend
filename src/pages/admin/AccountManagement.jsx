import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Trash2 } from 'lucide-react';

const AccountManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('investor'); // 'investor' or 'ideator'

  // Mock data - replace with actual API calls
  const users = [
    {
      id: 1,
      name: 'Nguyễn Thị Lan Anh',
      email: 'nguyenthilananh@gamil.com',
      phone: '0123456789',
      birthDate: '01/01/2000',
      address: 'Đà Nẵng',
      registrationDate: '01/01/2024',
      type: 'investor'
    },
    // Add more mock data as needed
  ];

  const filteredUsers = users.filter(user => 
    activeTab === 'investor' ? user.type === 'investor' : user.type === 'ideator'
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Quản lý tài khoản</h1>
          
          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'investor'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveTab('investor')}
              >
                Nhà đầu tư
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'ideator'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveTab('ideator')}
              >
                Ý tưởng viên
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Họ và Tên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đăng ký
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-center align-middle">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.registrationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium align-middle">
                      <div className="flex flex-row items-center justify-center gap-3">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-900 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-md flex items-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>Xem chi tiết</span>
                        </button>
                        <button
                          onClick={() => {/* Xử lý xoá tài khoản */}}
                          className="bg-gray-100 text-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 cursor-not-allowed"
                          disabled
                        >
                          <Trash2 className="w-5 h-5" />
                          <span>Xoá</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <nav className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-blue-900 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-full ${
                    page === 1 ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-2 rounded-full bg-blue-900 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>

        {/* User Detail Modal */}
        <Dialog
          open={selectedUser !== null}
          onClose={() => setSelectedUser(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <div className="flex justify-between items-center">
              <span>Thông Tin Cá Nhân</span>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </DialogTitle>
          <DialogContent>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Họ và Tên:</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedUser.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedUser.email}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Số điện thoại:</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedUser.phone}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ngày sinh:</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedUser.birthDate}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Địa chỉ:</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedUser.address}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ngày Đăng Ký:</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedUser.registrationDate}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      // Handle account deletion
                      setSelectedUser(null);
                    }}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Xóa tài khoản
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AccountManagement; 