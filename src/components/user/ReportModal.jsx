import React, { useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";

const ReportModal = ({ onClose, onSubmit, ideaId }) => {
  const [reason, setReason] = useState("Sao chép ý tưởng");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Tạo đối tượng dữ liệu báo cáo
    const reportData = {
      reason: reason,
      description: details,
      evidence: file
    };
    
    // Gọi hàm onSubmit từ props với dữ liệu báo cáo
    onSubmit(reportData);
    
    // Đóng modal sau khi gửi
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Báo cáo ý tưởng vi phạm</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Lý do báo cáo */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Lý do báo cáo</h3>
            <div className="space-y-2">
              {["Sao chép ý tưởng", "Nội dung vi phạm bản quyền", "Nội dung sai sự thật", "Khác"].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="reason"
                    value={option}
                    checked={reason === option}
                    onChange={(e) => setReason(e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Mô tả chi tiết */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Mô tả chi tiết</h3>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Nhập nội dung tố cáo chi tiết..."
              rows="3"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          {/* Tải bằng chứng */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Tải bằng chứng</h3>
            <label className="w-full border border-gray-300 rounded-lg p-3 flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-100">
              <FaUpload className="mr-2" /> Chọn tệp (Ảnh, PDF)
              <input type="file" onChange={handleFileChange} className="hidden" />
            </label>
            {file && <p className="text-sm mt-2 text-gray-600">Tệp đã chọn: {file.name}</p>}
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">Đóng</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Gửi báo cáo</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
