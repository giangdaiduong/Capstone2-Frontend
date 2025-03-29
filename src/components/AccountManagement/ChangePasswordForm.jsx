import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Đổi mật khẩu</h2>
      
      <div className="space-y-4">
        {/* Mật khẩu cũ */}
        <div className="flex items-center">
          <label className="w-32 text-sm text-gray-600">Mật khẩu cũ</label>
          <div className="relative flex-1">
            <input
              type={showPassword.old ? "text" : "password"}
              placeholder="Nhập mật khẩu cũ"
              className="w-full p-2 border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => togglePassword("old")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Mật khẩu mới */}
        <div className="flex items-center">
          <label className="w-32 text-sm text-gray-600">Mật khẩu mới</label>
          <div className="relative flex-1">
            <input
              type={showPassword.new ? "text" : "password"}
              placeholder="Nhập mật khẩu mới"
              className="w-full p-2 border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => togglePassword("new")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Nhập lại mật khẩu mới */}
        <div className="flex items-center">
          <label className="w-32 text-sm text-gray-600">Nhập lại mật khẩu</label>
          <div className="relative flex-1">
            <input
              type={showPassword.confirm ? "text" : "password"}
              placeholder="Nhập lại mật khẩu mới"
              className="w-full p-2 border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => togglePassword("confirm")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Nút Lưu */}
        <div className="text-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
