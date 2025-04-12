import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaCheckCircle, FaEye, FaThumbsUp, FaComment, FaArrowRight, FaFlag } from "react-icons/fa";
import ReportModal from "../../components/user/ReportModal";

const IdeaDetail = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);

  // Mock data - Fetch từ API trong thực tế
  const idea = {
    id: 1,
    title: "Camera phát hiện người và vật trong xe",
    author: "Lê Gia Phạm Thanh Cảnh",
    category: "Công nghệ",
    status: "Đã duyệt",
    createdAt: "10/22/2023",
    views: 100123,
    content: `
      Hiện nay, các hệ thống viễn giám khá khó khăn trong việc tối ưu mô hình, phát hiện lỗi và cải thiện hiệu quả. 
      Ý tưởng của tôi là một nền tảng AI có thể:
      • Tự động hiệu chỉnh code đầu ra sau khi train
      • Đề xuất phát minh các lỗi thường gặp từ GitHub, Stack Overflow
      • Hỗ trợ nhiều ngôn ngữ lập trình (Python, Java, JavaScript, C++, v.v.)
      • Tích hợp trực tiếp với VS Code, Intellij
    `,
    price: "Liên hệ để trao đổi chi tiết",
    relatedIdeas: [
      { id: 2, title: "Camera AI giám sát an toàn", category: "Công nghệ" },
      { id: 3, title: "Hệ thống nhận diện biển số thông minh", category: "Công nghệ" }
    ],
    ratings: 4,
    comments: []
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", comment);
    setComment("");
  };

  const handleReportSubmit = (reportData) => {
    console.log("Report submitted:", {
      ideaId: id,
      ...reportData
    });
    // Thêm code để gửi báo cáo đến API
  };

  return (
    <div className="container mx-auto px-4 py-6">

      {/* Tiêu đề & thông tin ý tưởng */}
      <div className="bg-blue-100 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-blue-800">{idea.title}</h1>
          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
            <FaCheckCircle className="inline mr-1" /> {idea.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span><FaUser className="inline mr-1" /> {idea.author}</span>
          <span><FaCalendarAlt className="inline mr-1" /> Ngày đăng: {idea.createdAt}</span>
          <span><FaEye className="inline mr-1" /> {idea.views} lượt xem</span>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Nội dung ý tưởng</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="whitespace-pre-line">{idea.content}</div>

          <div className="mt-4">
            <h3 className="font-semibold">Giá thương lượng:</h3>
            <p className="text-red-600 mt-1 flex items-center">
              <span>{idea.price}</span>
              <FaArrowRight className="ml-2" />
            </p>
          </div>
        </div>
      </div>

      {/* Hình ảnh */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Hình ảnh</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-200 p-4 flex items-center justify-center h-40">
            <span className="text-gray-500">Ảnh</span>
          </div>
          <div className="bg-gray-200 p-4 flex items-center justify-center h-40">
            <span className="text-gray-500">Ảnh</span>
          </div>
        </div>
      </div>

      {/* Founder */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-center text-sm mb-3">
          Founder có thể cập nhật nhưng vẫn bảo vệ bản quyền. Vui lòng liên hệ trực tiếp để trao đổi.
        </p>
        <div className="flex justify-center gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition hover:bg-blue-700">
            <FaUser className="mr-2" /> Liên hệ trực tiếp
          </button>
          <button className="bg-blue-800 text-white px-4 py-2 rounded-lg transition hover:bg-blue-900">
            Bảo vệ ý tưởng
          </button>
        </div>
      </div>

      {/* Báo cáo vi phạm */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center text-red-600 hover:text-red-800 transition px-3 py-2 rounded-lg hover:bg-red-50"
        >
          <FaFlag className="mr-2" /> Báo cáo vi phạm
        </button>
      </div>

      {/* Đánh giá */}
      <div className="mb-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold flex items-center mb-2">
            <FaThumbsUp className="mr-2 text-blue-600" />
            Đánh giá
          </h3>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`cursor-pointer text-2xl transition ${star <= rating || star <= idea.ratings ? "text-yellow-400" : "text-gray-300"
                  } hover:scale-110`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bình luận */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3 flex items-center">
          <FaComment className="mr-2 text-blue-600" />
          Viết bình luận
        </h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Để lại bình luận của bạn"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg transition hover:bg-blue-700"
            >
              Đăng bình luận
            </button>
          </div>
        </form>
      </div>

      {/* Modal báo cáo vi phạm */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReportSubmit}
          ideaId={id}
        />
      )}
    </div>
  );
};

export default IdeaDetail;
