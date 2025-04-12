import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaTag, FaThumbsUp, FaComment, FaImage } from 'react-icons/fa';

const UserPostedIdeas = () => {
    const [newPost, setNewPost] = useState('');
    const [postedIdeas] = useState([
        {
            id: 1,
            title: "Hệ Thống Gia Sư AI Cá Nhân Hóa",
            author: "Nguyễn Văn A",
            date: "10 tháng 2, 2025",
            categories: ["Giáo dục", "Công nghệ"],
            description: "Ứng dụng này sử dụng trí tuệ nhân tạo để phân tích cách học của từng học sinh và tạo ra giáo trình phù hợp. Hệ thống có thể đề xuất bài tập, giải thích nội dung theo cách dễ hiểu nhất và theo dõi tiến độ học tập.",
            likes: 20,
            comments: [
                {
                    author: "Nguyễn An",
                    content: "Ý tưởng hay! Bạn đã có kế hoạch tích hợp dữ liệu từ các nền tảng học tập hiện có chưa?",
                    likes: 5
                },
                {
                    author: "Trần Minh",
                    content: "Mô hình AI đánh định đúng có phải là GPT-based không? Nếu vậy, chi phí vận hành có thế cao!",
                    likes: 5
                }
            ],
            rating: 4.6,
            ratingCount: 15
        },
        // Thêm các ý tưởng khác tương tự
    ]);

    const handleNewPost = () => {
        if (newPost.trim()) {
            // Xử lý đăng bài mới
            console.log("Đăng bài mới:", newPost);
            setNewPost('');
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Phần đăng bài viết mới */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Đăng bài viết</h2>
                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaUser className="text-gray-500" />
                    </div>
                    <div className="flex-1">
                        <Link 
                            to="/user/ideas/create" 
                            className="block w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition cursor-pointer"
                        >
                            Đăng bài viết mới
                        </Link>
                    </div>
                </div>
            </div>

            {/* Danh sách bài viết */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4">Bài viết của bạn</h2>
                <div className="space-y-6">
                    {postedIdeas.map((idea) => (
                        <div key={idea.id} className="border-b pb-6 last:border-b-0">
                            {/* Header bài viết */}
                            <div className="flex items-start space-x-4 mb-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <FaUser className="text-gray-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{idea.author}</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <FaCalendarAlt className="mr-1" />
                                        <span>{idea.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Nội dung bài viết */}
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold mb-2">{idea.title}</h4>
                                <p className="text-gray-600 mb-3">{idea.description}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {idea.categories.map((category, index) => (
                                        <span 
                                            key={index}
                                            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {[1, 2, 3].map((img) => (
                                        <div key={img} className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
                                            <FaImage className="text-gray-400 text-2xl" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Thống kê tương tác */}
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <div className="flex items-center space-x-4">
                                    <span className="flex items-center">
                                        <FaThumbsUp className="mr-1" />
                                        {idea.likes}
                                    </span>
                                    <span className="flex items-center">
                                        <FaComment className="mr-1" />
                                        {idea.comments.length} Bình luận
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-yellow-400">★</span>
                                    <span>{idea.rating}</span>
                                    <span className="text-gray-400 ml-1">({idea.ratingCount} đánh giá)</span>
                                </div>
                            </div>

                            {/* Phần bình luận */}
                            <div className="space-y-4">
                                <h5 className="font-semibold">{idea.comments.length} Bình luận</h5>
                                {idea.comments.map((comment, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <FaUser className="text-gray-500 text-sm" />
                                        </div>
                                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                            <div className="font-semibold text-sm">{comment.author}</div>
                                            <p className="text-sm text-gray-600">{comment.content}</p>
                                            <div className="flex items-center mt-2 text-sm text-gray-500">
                                                <button className="hover:text-blue-600">
                                                    <FaThumbsUp className="mr-1 inline" />
                                                    {comment.likes}
                                                </button>
                                                <button className="ml-4 hover:text-blue-600">
                                                    Phản hồi
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                {/* Form bình luận mới */}
                                <div className="flex items-start space-x-3 mt-4">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                        <FaUser className="text-gray-500 text-sm" />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Viết bình luận..."
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPostedIdeas;
