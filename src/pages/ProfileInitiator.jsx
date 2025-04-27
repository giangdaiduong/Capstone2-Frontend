"use client"

import { useState } from "react"
import {
  ThumbsUp,
  MessageCircle,
  Send,
  Star,
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  ImageIcon,
} from "lucide-react"

const initialPosts = [
  {
    id: 1,
    author: "Nguyễn Văn A",
    date: "10 tháng 2, 2025",
    content:
      "Ứng dụng này sử dụng trí tuệ nhân tạo để phân tích cách học của từng học sinh và tạo ra giáo trình phù hợp. Hệ thống có thể đề xuất bài tập, giải thích nội dung theo cách dễ hiểu nhất và theo dõi tiến độ học tập.",
    tags: ["Giáo dục", "Công nghệ"],
    images: [1, 2, 3],
    likes: 20,
    comments: [
      {
        user: "Nguyễn An",
        text: "Ý tưởng hay! Bạn đã có kế hoạch tích hợp dữ liệu từ các nền tảng học tập hiện có chưa?",
        rating: 4,
      },
      {
        user: "Trần Minh",
        text: "Ý tưởng hay! Bạn đã có kế hoạch tích hợp dữ liệu từ các nền tảng học tập hiện có chưa?",
        rating: 5,
      },
    ],
    rating: 4,
  },
  {
    id: 2,
    author: "Nguyễn Văn A",
    date: "10 tháng 2, 2025",
    content:
      "Ứng dụng này sử dụng trí tuệ nhân tạo để phân tích cách học của từng học sinh và tạo ra giáo trình phù hợp. Hệ thống có thể đề xuất bài tập, giải thích nội dung theo cách dễ hiểu nhất và theo dõi tiến độ học tập.",
    tags: ["Giáo dục", "Công nghệ"],
    images: [1, 2, 3],
    likes: 20,
    comments: [
      {
        user: "Nguyễn An",
        text: "Ý tưởng hay! Bạn đã có kế hoạch tích hợp dữ liệu từ các nền tảng học tập hiện có chưa?",
        rating: 4,
      },
      {
        user: "Trần Minh",
        text: "Ý tưởng hay! Bạn đã có kế hoạch tích hợp dữ liệu từ các nền tảng học tập hiện có chưa?",
        rating: 5,
      },
    ],
    rating: 4,
  },
]

const ProfileInitiator = () => {
  const [posts, setPosts] = useState(initialPosts)
  const [commentInputs, setCommentInputs] = useState({})
  const [likedPosts, setLikedPosts] = useState({}) // { [postId]: true/false }
  const [ratingInputs, setRatingInputs] = useState({}) // { [postId]: số sao user chọn }

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = likedPosts[postId]
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  const handleCommentInput = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }))
  }

  const handleRatingInput = (postId, value) => {
    setRatingInputs((prev) => ({ ...prev, [postId]: value }))
  }

  const handleSendComment = (postId) => {
    const text = commentInputs[postId]?.trim()
    const rating = ratingInputs[postId] || 0
    if (!text) return
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, { user: "Bạn", text, rating }],
              // Cập nhật rating trung bình (nếu muốn)
              rating: Math.round(
                [...post.comments, { rating }].reduce((sum, c) => sum + (c.rating || 0), 0) /
                  [...post.comments, { rating }].length,
              ),
            }
          : post,
      ),
    )
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }))
    setRatingInputs((prev) => ({ ...prev, [postId]: 0 }))
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">Hồ sơ Ý tưởng viên</h1>
          <p className="text-slate-500">Xem Thông tin cá nhân của Ý tưởng viên</p>
        </header>

        {/* Profile Card */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Thông tin cá nhân</h2>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar and Contact Button */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <User size={64} className="text-blue-300" />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
                  Liên hệ
                </button>
              </div>

              {/* Personal Information */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div className="flex items-start gap-3">
                  <User size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Họ và Tên</p>
                    <p className="font-medium text-slate-800">Nguyễn Văn A</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Số điện thoại</p>
                    <p className="font-medium text-slate-800">0909 123 456</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Vai trò</p>
                    <p className="font-medium text-slate-800">Ý tưởng viên</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Địa chỉ</p>
                    <p className="font-medium text-slate-800">01 Quang Trung</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Email</p>
                    <p className="font-medium text-slate-800">nguyenvana@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Ngày sinh</p>
                    <p className="font-medium text-slate-800">15/06/1985</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Các bài viết cộng đồng</h2>
          </div>

          <div className="p-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="mb-8 last:mb-0 bg-white border border-slate-100 rounded-lg shadow-sm overflow-hidden"
              >
                {/* Post Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-800">{post.author}</h3>
                        <time className="text-xs text-slate-500">{post.date}</time>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-6 py-5">
                  <div className="space-y-5">
                    {/* Main Content */}
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-700 leading-relaxed">{post.content}</p>
                    </div>

                    {/* Tags Section */}
                    <div className="pt-2">
                      <h4 className="text-xs uppercase text-slate-500 font-semibold mb-2">Chủ đề</h4>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Images Section */}
                    <div className="pt-2">
                      <h4 className="text-xs uppercase text-slate-500 font-semibold mb-2">Hình ảnh</h4>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {post.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="w-28 h-20 bg-slate-100 flex-shrink-0 rounded-md flex items-center justify-center text-slate-400 border border-slate-200"
                          >
                            <ImageIcon size={24} className="text-slate-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-6 py-3 bg-slate-50 border-t border-b border-slate-100">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 ${
                        likedPosts[post.id] ? "text-blue-600" : "text-slate-500"
                      } hover:text-blue-600 transition-colors`}
                    >
                      <ThumbsUp size={18} className={likedPosts[post.id] ? "fill-blue-600" : ""} />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>

                    <div className="flex items-center gap-2 text-slate-500">
                      <MessageCircle size={18} />
                      <span className="text-sm font-medium">{post.comments.length}</span>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="px-6 py-5">
                  <h4 className="font-medium text-slate-700 mb-4 flex items-center gap-2">
                    <MessageCircle size={18} className="text-blue-500" />
                    Bình luận
                  </h4>

                  {post.comments.length === 0 ? (
                    <div className="text-slate-400 text-sm italic">Chưa có bình luận nào.</div>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {post.comments.map((cmt, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User size={14} className="text-blue-500" />
                            </div>
                            <span className="font-medium text-blue-700">{cmt.user}</span>
                          </div>
                          <p className="text-slate-600 text-sm pl-10">{cmt.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment Form */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex gap-2 items-center">
                      <input
                        className="w-full border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        placeholder="Viết bình luận của bạn..."
                        value={commentInputs[post.id] || ""}
                        onChange={(e) => handleCommentInput(post.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSendComment(post.id)
                        }}
                      />
                      <button
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        onClick={() => handleSendComment(post.id)}
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProfileInitiator
