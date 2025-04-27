import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTags,
  faCalendarPlus,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import ReportModal from "../../components/user/ReportModal";

const IdeaDetail = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);

  // Mock data - Replace with API call later
  const ideaDetail = {
    id: "CNKT-100123",
    title: "Nền tảng AI hỗ trợ quản lý doanh nghiệp",
    author: "Phạm Thanh Cảnh",
    date: "10/2/2025",
    field: "Công nghệ",
    status: "Đã đăng ký bản quyền",
    content: {
      summary: "Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động hóa quy trình quản lý doanh nghiệp, bao gồm:",
      features: [
        "Phân tích dữ liệu kinh doanh",
        "Tối ưu hóa quy trình làm việc",
        "Hỗ trợ quyết định thông minh",
        "Dự báo tài chính và hiệu suất"
      ]
    },
    funding: {
      amount: "2 triệu USD",
      purpose: "Chúng tôi tìm kiếm các nhà đầu tư quan tâm đến công nghệ AI để mở rộng quy mô nền tảng và phát triển các tính năng cao cấp hơn."
    },
    timeline: "Từ Q2/2025 đến Q4/2025",
    businessPlan: {
      phases: [
        "Giai đoạn 1: Xây dựng nền tảng cơ bản, thử nghiệm trên một nhóm doanh nghiệp nhỏ.",
        "Giai đoạn 2: Phát triển các tính năng tiên tiến như AI Machine Learning, chatbot hỗ trợ tự động.",
        "Giai đoạn 3: Mở rộng thị trường và tìm đối tác toàn cầu."
      ]
    },
    team: {
      leader: {
        name: "Trần Minh Quân",
        role: "CEO",
        experience: "10+ năm kinh nghiệm trong AI & Data Science"
      },
      members: [
        {
          name: "Nguyễn Thị Lan",
          role: "CTO",
          expertise: "chuyên gia phát triển hệ thống AI"
        },
        {
          name: "Phạm Anh Tuấn",
          role: "CFO",
          experience: "8+ năm kinh nghiệm trong tài chính doanh nghiệp"
        },
        {
          name: "Lê Quốc Hà",
          role: "CMO",
          expertise: "chuyên gia tiếp thị AI"
        }
      ]
    }
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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-[#adc6ee] rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[#0A2273]">{ideaDetail.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faTags} className="text-[#FBF30F] mr-2" />
              <span className="text-[#FBF30F] font-bold">Tìm nhà đầu tư</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCheckDouble} className="text-green-500 mr-2" />
              <span className="text-[#0A2273]">{ideaDetail.status}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[#0A2273]">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            <span>{ideaDetail.author}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
            <span>Ngày đăng: {ideaDetail.date}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faTags} className="mr-2" />
            <span>Lĩnh vực: <strong>{ideaDetail.field}</strong></span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Nội dung ý tưởng</h2>
        <p className="mb-4">{ideaDetail.content.summary}</p>
        <ul className="list-disc pl-6 mb-6">
          {ideaDetail.content.features.map((feature, index) => (
            <li key={index} className="mb-2">{feature}</li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mb-4">Thông tin gọi vốn</h2>
        <div className="mb-6">
          <p className="mb-2"><strong>Số vốn cần huy động:</strong> {ideaDetail.funding.amount}</p>
          <p className="mb-2"><strong>Nội dung gọi vốn:</strong> {ideaDetail.funding.purpose}</p>
          <p><strong>Thời gian gọi vốn:</strong> {ideaDetail.timeline}</p>
        </div>

        <h2 className="text-xl font-bold mb-4">Mô tả kế hoạch kinh doanh</h2>
        <ul className="list-disc pl-6 mb-6">
          {ideaDetail.businessPlan.phases.map((phase, index) => (
            <li key={index} className="mb-2">{phase}</li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mb-4">Đội ngũ sáng lập</h2>
        <div className="mb-4">
          <p className="font-bold">Người đại diện:</p>
          <p>{ideaDetail.team.leader.name} - {ideaDetail.team.leader.role}, {ideaDetail.team.leader.experience}</p>
        </div>
        <div>
          <p className="font-bold mb-2">Thành viên:</p>
          <ul className="list-disc pl-6">
            {ideaDetail.team.members.map((member, index) => (
              <li key={index} className="mb-2">
                {member.name} - {member.role}, {member.expertise || member.experience}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-200 aspect-square flex items-center justify-center rounded-lg">
          <span className="text-gray-500">Ảnh</span>
        </div>
        <div className="bg-gray-200 aspect-square flex items-center justify-center rounded-lg">
          <span className="text-gray-500">Ảnh</span>
        </div>
        <div className="bg-gray-200 aspect-square flex items-center justify-center rounded-lg">
          <span className="text-gray-500">Ảnh</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mb-8">
        <p className="mb-4">Founder đã cung cấp giấy chứng nhận bản quyền. Vui lòng liên hệ trực tiếp để trao đổi.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-[#0A2273] text-white px-6 py-2 rounded-lg hover:bg-opacity-90">
            Quan tâm
          </button>
          <button className="bg-[#0A2273] text-white px-6 py-2 rounded-lg hover:bg-opacity-90">
            Liên hệ tác giả
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-opacity-90">
            Báo cáo
          </button>
        </div>
      </div>

      {/* Đánh giá */}
      <div className="mb-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold flex items-center mb-2">
            <FontAwesomeIcon icon={faTags} className="mr-2 text-blue-600" />
            Đánh giá
          </h3>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`cursor-pointer text-2xl transition ${star <= rating ? "text-yellow-400" : "text-gray-300"
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
          <FontAwesomeIcon icon={faTags} className="mr-2 text-blue-600" />
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
