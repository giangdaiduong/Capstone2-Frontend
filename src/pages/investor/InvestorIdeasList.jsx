import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaEye, FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const InvestorIdeasHistory = () => {
    const [ideas] = useState([
        {
            id: 1,
            title: "Nền tảng AI hỗ trợ quản lý doanh nghiệp",
            author: "Phạm Thanh Cảnh",
            date: "10/02/2025",
            category: "Công nghệ",
            description: "Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động hóa quy trình quản lý doanh nghiệp, bao gồm...",
            isProtected: true,
            rating: 4.5,
            views: 1234
        },
        {
            id: 2,
            title: "Nền tảng AI hỗ trợ quản lý doanh nghiệp",
            author: "Phạm Thanh Cảnh",
            date: "10/02/2025",
            category: "Công nghệ",
            description: "Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động hóa quy trình quản lý doanh nghiệp, bao gồm...",
            isProtected: true,
            rating: 4.5,
            views: 1234
        },
        {
            id: 3,
            title: "Nền tảng AI hỗ trợ quản lý doanh nghiệp",
            author: "Phạm Thanh Cảnh",
            date: "10/02/2025",
            category: "Công nghệ",
            description: "Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động hóa quy trình quản lý doanh nghiệp, bao gồm...",
            isProtected: true,
            rating: 4.5,
            views: 1234
        },
        {
            id: 4,
            title: "Nền tảng AI hỗ trợ quản lý doanh nghiệp",
            author: "Phạm Thanh Cảnh",
            date: "10/02/2025",
            category: "Công nghệ",
            description: "Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động hóa quy trình quản lý doanh nghiệp, bao gồm...",
            isProtected: true,
            rating: 4.5,
            views: 1234
        },
        {
            id: 5,
            title: "Nền tảng AI hỗ trợ quản lý doanh nghiệp",
            author: "Phạm Thanh Cảnh",
            date: "10/02/2025",
            category: "Công nghệ",
            description: "Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động hóa quy trình quản lý doanh nghiệp, bao gồm...",
            isProtected: true,
            rating: 4.5,
            views: 1234
        }
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    const categories = [
        { value: 'all', label: 'Tất cả lĩnh vực' },
        { value: 'technology', label: 'Công nghệ' },
        { value: 'business', label: 'Kinh doanh' },
        { value: 'education', label: 'Giáo dục' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Mới nhất' },
        { value: 'popular', label: 'Phổ biến nhất' },
        { value: 'rating', label: 'Đánh giá cao' }
    ];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto px-4">
            {/* Header và Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Danh sách ý tưởng</h1>
                <div className="relative w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Tìm kiếm ý tưởng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {categories.map(category => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Ideas List */}
            <div className="space-y-4">
                {ideas.map((idea) => (
                    <div key={idea.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                            <div>
                                <Link
                                    to={`/investor/ideas/${idea.id}`}
                                    className="text-xl font-semibold text-blue-800 hover:text-blue-600 transition"
                                >
                                    {idea.title}
                                </Link>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
                                    <span className="flex items-center">
                                        <FaUser className="mr-1" /> {idea.author}
                                    </span>
                                    <span className="flex items-center">
                                        <FaCalendarAlt className="mr-1" /> {idea.date}
                                    </span>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {idea.category}
                                    </span>
                                </div>
                            </div>
                            {idea.isProtected && (
                                <span className="mt-2 md:mt-0 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                    Đã đăng ký bản quyền
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">{idea.description}</p>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                    <FaStar className="text-yellow-400 mr-1" /> {idea.rating}
                                </span>
                                <span className="flex items-center">
                                    <FaEye className="mr-1" /> {idea.views.toLocaleString()}
                                </span>
                            </div>
                            <Link
                                to={`/investor/ideas/${idea.id}`}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto text-center"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaChevronLeft className="w-4 h-4" />
                </button>

                {[1, 2, 3, 4, 5].map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-full ${page === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-blue-100'
                            } transition-colors`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === 5}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default InvestorIdeasHistory;
