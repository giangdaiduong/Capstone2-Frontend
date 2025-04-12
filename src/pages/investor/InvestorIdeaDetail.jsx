import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaTag, FaIdCard, FaClock, FaImages, FaFlag } from 'react-icons/fa';

const InvestorIdeaDetail = () => {
    const { id } = useParams();
    const [showReportModal, setShowReportModal] = useState(false);

    // Mock data - sẽ được thay thế bằng API call
    const idea = {
        id: 1,
        title: "Nền tảng AI hỗ trợ quản lý doanh nghiệp",
        author: "Phạm Thanh Cảnh",
        transactionId: "CNKT - 100123",
        category: "Công nghệ",
        postDate: "10/2/2025",
        isProtected: true,
        content: {
            description: "Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động hóa quy trình quản lý doanh nghiệp, bao gồm:",
            features: [
                "Phân tích dữ liệu kinh doanh",
                "Tối ưu hóa quy trình làm việc",
                "Hỗ trợ quyết định thông minh",
                "Dự báo tài chính và hiệu suất"
            ],
            benefit: "Hệ thống này giúp doanh nghiệp tiết kiệm thời gian, giảm chi phí và tăng hiệu quả vận hành.",
            investment: {
                required: "2 triệu USD",
                purpose: "Chúng tôi tìm kiếm các nhà đầu tư quan tâm đến công nghệ AI để mở rộng quy mô nền tảng và phát triển các tính năng cao cấp hơn."
            },
            timeline: {
                start: "02/2025",
                end: "04/2025"
            }
        },
        businessPlan: {
            phases: [
                {
                    phase: 1,
                    description: "Xây dựng MVP và thử nghiệm trên một nhóm doanh nghiệp nhỏ"
                },
                {
                    phase: 2,
                    description: "Phát triển các tính năng tiên tiến như AI Machine Learning, chatbot hỗ trợ tự động"
                },
                {
                    phase: 3,
                    description: "Mở rộng thị trường và đạt đến các tầm cao"
                }
            ]
        },
        team: [
            {
                name: "Trần Minh Quân",
                role: "CEO",
                experience: "10+ năm kinh nghiệm trong AI & Data Science"
            },
            {
                name: "Nguyễn Thị Lan",
                role: "CTO",
                experience: "Chuyên gia phát triển hệ thống AI"
            },
            {
                name: "Phạm Anh Tuấn",
                role: "CFO",
                experience: "8+ năm kinh nghiệm trong tài chính doanh nghiệp"
            },
            {
                name: "Lê Quốc Na",
                role: "CMO",
                experience: "Chuyên gia tiếp thị AI"
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Header */}
            <div className="bg-blue-100 rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h1 className="text-2xl font-bold text-blue-800">{idea.title}</h1>
                    {idea.isProtected && (
                        <span className="mt-2 md:mt-0 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            Đã đăng ký bản quyền
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <FaUser className="mr-2" />
                        <span>Tác giả: {idea.author}</span>
                    </div>
                    <div className="flex items-center">
                        <FaIdCard className="mr-2" />
                        <span>Mã giao dịch: {idea.transactionId}</span>
                    </div>
                    <div className="flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        <span>Ngày đăng: {idea.postDate}</span>
                    </div>
                    <div className="flex items-center">
                        <FaTag className="mr-2" />
                        <span>Lĩnh vực: {idea.category}</span>
                    </div>
                </div>
            </div>

            {/* Nội dung ý tưởng */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Nội dung ý tưởng</h2>
                <p className="mb-4">{idea.content.description}</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                    {idea.content.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                <p className="mb-4">{idea.content.benefit}</p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold mb-2">Số vốn cần huy động</h3>
                    <p className="text-red-600 font-semibold">{idea.content.investment.required}</p>
                    <p className="mt-2">{idea.content.investment.purpose}</p>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-2" />
                    <span>Thời gian gọi vốn: Từ {idea.content.timeline.start} đến {idea.content.timeline.end}</span>
                </div>
            </div>

            {/* Kế hoạch kinh doanh */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Kế hoạch kinh doanh</h2>
                <div className="space-y-4">
                    {idea.businessPlan.phases.map((phase, index) => (
                        <div key={index} className="flex">
                            <div className="mr-4">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                                    {phase.phase}
                                </div>
                            </div>
                            <div>
                                <p>Giai đoạn {phase.phase}: {phase.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Đội ngũ sáng lập */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Đội ngũ sáng lập</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {idea.team.map((member, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3">
                                <FaUser className="w-full h-full p-6 text-gray-400" />
                            </div>
                            <h3 className="font-semibold text-center">{member.name}</h3>
                            <p className="text-blue-600 text-sm text-center mb-2">{member.role}</p>
                            <p className="text-sm text-gray-600 text-center">{member.experience}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hình ảnh */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Hình ảnh</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((img, index) => (
                        <div key={index} className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
                            <FaImages className="text-gray-400 text-4xl" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    Quan tâm
                </button>
                <button className="bg-blue-100 text-blue-800 px-6 py-3 rounded-lg hover:bg-blue-200 transition">
                    Liên hệ tác giả
                </button>
                <button 
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center justify-center text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition"
                >
                    <FaFlag className="mr-2" />
                    Báo cáo
                </button>
            </div>
        </div>
    );
};

export default InvestorIdeaDetail;
