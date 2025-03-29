import { Camera, User } from "lucide-react";

export default function AvatarUpload() {
  return (
    <div className="flex justify-end bg-gray-300 mt-4">
      <div className="relative w-40 h-40">
        {/* Avatar Mặc Định (Icon) */}
        <User className="w-full h-full text-gray-400 " />

        {/* Upload Button */}
        <label className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full cursor-pointer">
          <Camera size={16} className="text-gray-600" />
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}