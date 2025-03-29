import AvatarUpload from "./AvatarUpload";

export default function ProfileForm() {
  return (
    <div className="max-w-4xl mx-auto bg-white w-[950px] p-6 shadow-md rounded-lg flex">
      {/* Left Section */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-4">Thông tin cá nhân</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <label className="font-semibold block text-sm text-gray-600">Tên đăng nhập</label>
            <input type="text" value="Văn A" className=" w-[350px] p-2 border rounded-md" />
          </div >
          <div className="flex justify-between">
            <label className="font-semibold block text-sm text-gray-600">Email</label>
            <input type="email" value="nguyenvana@gmail.com" className="w-[350px] p-2 border rounded-md" />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold block text-sm text-gray-600">Số điện thoại</label>
            <input type="text" value="0123456789" className="w-[350px] p-2 border rounded-md" />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold block text-sm text-gray-600">Ngày sinh</label>
            <input type="date" value="2003-02-01" className="w-[350px] p-2 border rounded-md" />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold block text-sm text-gray-600">Địa chỉ</label>
            <input type="text" value="01 Quang Trung" className="w-[350px] p-2 border rounded-md" />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold block text-sm text-gray-600">Vai trò</label>
            <input type="text" value="Ý tưởng viên" className="w-[350px] p-2 border rounded-md" disabled />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold block text-sm text-gray-600">Ngày tạo tài khoản</label>
            <input type="date" value="2024-01-01" className="w-[350px] p-2 border rounded-md" disabled />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold block text-sm text-gray-600">Ngày cập nhật gần nhất</label>
            <input type="date" value="2025-03-10" className="w-[350px] p-2 border rounded-md" disabled />
          </div>
        </div>
        <div className="flex justify-end w-full">
           <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Lưu thay đổi
        </button>
        </div>
       
      </div>
      
      {/* Right Section - Avatar */}
      <div className="ml-6 flex items-start">
        <AvatarUpload />
      </div>
    </div>
  );
}