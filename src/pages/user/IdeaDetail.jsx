import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaCheckCircle, FaEye, FaThumbsUp, FaComment, FaArrowRight, FaFlag, FaCopyright, FaMapMarkerAlt, FaChartLine } from "react-icons/fa";
import ReportModal from "../../components/user/ReportModal";
import axiosInstance from "../../utils/httpRequest";

const logger = {
  info: (message, data) => console.log(`[INFO] ${message}`, data),
  error: (message, data) => console.error(`[ERROR] ${message}`, data),
};

const IdeaDetail = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdeaDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/client/Ideas/${id}`);
        setIdea(response.data);
        logger.info('Fetched Idea Details', response.data);
      } catch (err) {
        setError(err.message);
        logger.error('Fetch Idea Details Failed', { error: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchIdeaDetails();
  }, [id]);

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

  if (loading) {
    return <div className="container mx-auto px-4 py-6 text-center">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-6 text-center text-red-600">Lỗi: {error}</div>;
  }

  if (!idea) {
    return <div className="container mx-auto px-4 py-6 text-center">Không tìm thấy ý tưởng</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back to ideas */}
      <div className="mb-4">
        <Link to="/user" className="text-blue-600 hover:text-blue-800">
          &larr; Quay lại danh sách ý tưởng
        </Link>
      </div>
      
      {/* Tiêu đề & thông tin ý tưởng */}
      <div className="bg-blue-100 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl font-bold text-blue-800">{idea.title}</h1>
            <div className="text-sm text-gray-600">Mã: {idea.ideaCode}</div>
          </div>
          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
            <FaCheckCircle className="inline mr-1" /> {idea.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span><FaUser className="inline mr-1" /> {idea.initiatorId || "Ẩn danh"}</span>
          <span><FaCalendarAlt className="inline mr-1" /> Ngày đăng: {new Date(idea.createdOn !== "0001-01-01T00:00:00" ? idea.createdOn : Date.now()).toLocaleString()}</span>
          <span><FaEye className="inline mr-1" /> {idea.totalViews} lượt xem</span>
          {idea.region && <span><FaMapMarkerAlt className="inline mr-1" /> {idea.region}</span>}
          {idea.stage && <span><FaChartLine className="inline mr-1" /> Giai đoạn: {idea.stage}</span>}
        </div>
      </div>

      {/* Loại hợp tác & Danh mục */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Loại hợp tác</h3>
            <div className="bg-blue-50 p-3 rounded-lg">{idea.collaborationType}</div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Danh mục</h3>
            <div className="bg-blue-50 p-3 rounded-lg">{idea.categoryId}</div>
          </div>
        </div>
      </div>
      
      {/* Hình ảnh chính & Chứng nhận bản quyền */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Hình ảnh</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {idea.imageUrls && (
            <div className="bg-white shadow p-2 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Hình ảnh minh họa</h3>
              <img src={idea.imageUrls} alt="Hình ảnh minh họa" className="w-full h-64 object-cover rounded-lg" />
            </div>
          )}
          
          {idea.copyrightStatus && idea.copyrightCertificate && (
            <div className="bg-white shadow p-2 rounded-lg">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <FaCopyright className="mr-1 text-green-600" /> Chứng nhận bản quyền
              </h3>
              <img src={idea.copyrightCertificate} alt="Chứng nhận bản quyền" className="w-full h-64 object-cover rounded-lg" />
            </div>
          )}
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Nội dung ý tưởng</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="whitespace-pre-line">{idea.description}</div>

          <div className="mt-4">
            <h3 className="font-semibold">Giá thương lượng:</h3>
            <p className="text-red-600 mt-1 flex items-center">
              <span>{idea.isForSale ? `${idea.price.toLocaleString()} VNĐ` : 'Không bán'}</span>
              {idea.isForSale && <FaArrowRight className="ml-2" />}
            </p>
          </div>
        </div>
      </div>
      
      {/* Thông tin pháp lý */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Thông tin pháp lý</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Trạng thái bản quyền</h3>
              <p className={`mt-1 ${idea.copyrightStatus ? "text-green-600" : "text-yellow-600"}`}>
                {idea.copyrightStatus ? "Đã đăng ký bản quyền" : "Chưa đăng ký bản quyền"}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Công khai</h3>
              <p className="mt-1">
                {idea.isPublic ? "Công khai" : "Riêng tư"}
              </p>
            </div>
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
                className={`cursor-pointer text-2xl transition ${star <= rating || star <= (idea.totalRatings || 0) ? "text-yellow-400" : "text-gray-300"
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