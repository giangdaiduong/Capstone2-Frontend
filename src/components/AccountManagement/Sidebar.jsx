import { User, Lock, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-1/3 bg-white p-6 shadow-md rounded-lg">
      {/* Avatar */}
     
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full"> <User className="p-2 w-full h-full text-gray-400 " /></div>
        <h2 className="text-lg font-semibold mt-3">Nguyễn Văn A</h2>
        <p className="text-gray-500 text-sm">Thành viên từ: 10/02/2025</p>
      </div>

      {/* Menu */}
      <div className="mt-6 space-y-4">
        <a href="#" className="flex items-center space-x-2 text-blue-600 font-medium">
          <User size={18} /> <span>Thông tin tài khoản</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <Lock size={18} /> <span>Đổi mật khẩu</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-red-500">
          <LogOut size={18} /> <span>Đăng xuất</span>
        </a>
      </div>
    </div>
  );
}