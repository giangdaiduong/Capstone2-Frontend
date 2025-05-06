import React from 'react';
import { useParams } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaTag, FaThumbsUp, FaStar, FaReply } from 'react-icons/fa';
import HeaderIdea from '../../components/HeaderIdea';
const IdeaRatings = () => {
    const { id } = useParams();

    // Mock data - sẽ được thay thế bằng API call
    const ideaData = {
        id: 1,
        title: "StartupConnect - Kết Nối Nhà Đầu Tư Với Ý Tưởng Sáng Tạo",
        author: "Nguyễn Văn A",
        date: "10 tháng 2, 2025",
        categories: ["Kinh doanh", "Đầu tư"],
        description: "StartupConnect là nền tảng giúp các startup kết nối với nhà đầu tư thông qua hồ sơ dự án. Các nhà đầu tư có thể tìm kiếm dự án theo lĩnh vực, đọc tóm tắt ý tưởng và đặt lịch họp trực tiếp với founder.",
        rating: {
            average: 4.6,
            total: 15,
            distribution: [
                { stars: 5, percentage: 80, count: 12 },
                { stars: 4, percentage: 10, count: 2 },
                { stars: 3, percentage: 5, count: 1 },
                { stars: 2, percentage: 3, count: 0 },
                { stars: 1, percentage: 2, count: 0 }
            ]
        },
        comments: [
            {
                id: 1,
                author: "Lê Quang",
                content: "Cách bạn kiểm soát chất lượng dự án như thế nào để tránh các ý tưởng không khả thi?",
                likes: 5,
                hasLiked: false
            },
            {
                id: 2,
                author: "Hoàng Nam",
                content: "Nếu nền tảng này đã có nhiều đối thủ, bạn có điểm gì khác biệt?",
                likes: 5,
                hasLiked: false
            }
        ]
    };

    const renderStars = (count) => {
        return Array(5).fill(0).map((_, index) => (
            <FaStar 
                key={index}
                className={`${index < count ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    return (
    <>
        <HeaderIdea /> {/* ✅ Header áp dụng cho trang này */}
        <div className="container mx-auto px-4 py-6">
            {/* Thông tin ý tưởng */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaUser className="text-gray-500" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold mb-2">{ideaData.title}</h1>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <span className="flex items-center">
                                <FaUser className="mr-1" />
                                {ideaData.author}
                            </span>
                            <span className="flex items-center">
                                <FaCalendarAlt className="mr-1" />
                                {ideaData.date}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {ideaData.categories.map((category, index) => (
                        <span 
                            key={index}
                            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                            {category}
                        </span>
                    ))}
                </div>
                <p className="text-gray-600">{ideaData.description}</p>
            </div>

            {/* Thống kê đánh giá */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">Đánh giá và nhận xét</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Điểm đánh giá tổng quan */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="text-5xl font-bold text-blue-600 mb-2">
                            {ideaData.rating.average}
                        </div>
                        <div className="flex justify-center md:justify-start mb-2">
                            {renderStars(Math.round(ideaData.rating.average))}
                        </div>
                        <div className="text-gray-500">
                            {ideaData.rating.total} đánh giá
                        </div>
                    </div>

                    {/* Chi tiết phân bố đánh giá */}
                    <div className="flex-[2]">
                        {ideaData.rating.distribution.map((item, index) => (
                            <div key={5-index} className="flex items-center mb-2">
                                <div className="w-12 flex items-center">
                                    <span className="mr-2">{5-index}</span>
                                    <FaStar className="text-yellow-400" />
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="h-2 bg-gray-200 rounded-full">
                                        <div 
                                            className="h-2 bg-yellow-400 rounded-full"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="w-16 text-right text-gray-500">
                                    {item.percentage}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Danh sách bình luận */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Bình luận ({ideaData.comments.length})</h2>
                
                {/* Form bình luận mới */}
                <div className="flex items-start space-x-4 mb-8">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaUser className="text-gray-500" />
                    </div>
                    <div className="flex-1">
                        <textarea
                            placeholder="Viết bình luận..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                        />
                        <button className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Gửi bình luận
                        </button>
                    </div>
                </div>

                {/* Danh sách bình luận */}
                <div className="space-y-6">
                    {ideaData.comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <FaUser className="text-gray-500" />
                            </div>
                            <div className="flex-1">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="font-semibold mb-1">{comment.author}</div>
                                    <p className="text-gray-600 mb-3">{comment.content}</p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <button 
                                            className={`flex items-center hover:text-blue-600 ${
                                                comment.hasLiked ? 'text-blue-600' : ''
                                            }`}
                                        >
                                            <FaThumbsUp className="mr-1" />
                                            {comment.likes}
                                        </button>
                                        <button className="flex items-center hover:text-blue-600">
                                            <FaReply className="mr-1" />
                                            Phản hồi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default IdeaRatings;