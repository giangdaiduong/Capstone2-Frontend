import Sidebar from "./Sidebar";
import ProfileForm from "./ProfileForm";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div
  className="text-white text-center py-6 bg-cover bg-center"
  style={{ backgroundImage: "url('/img/panner.png')" }}
>
  <h1 className="text-[#0A2273] text-3xl font-bold">Quản lý tài khoản</h1>
  <p className="text-lg font-medium ">Trang chủ - Quản lý tài khoản</p>
</div>

      {/* Content */}
      <div className="max-w-5xl mx-auto mt-6 flex gap-6">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Profile Form */}
        <ProfileForm />
      </div>
    </div>
  );
}