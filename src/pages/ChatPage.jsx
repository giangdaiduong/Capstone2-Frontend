import React from 'react'

export default function ChatPage() {
  return (
    <div className="border border-gray-400 rounded-xl">      
    <div className="pt-6 pr-10 pb-10 pl-10">
    <h1 className="mb-6 text-xl font-bold">Đổi mật khẩu</h1>
      <div className="flex items-center mb-8">
        <label
          htmlFor="fullName"
          className="text-sm font-semibold mr-12 min-w-[120px] max-w-[100px]"
        >
         Mật khẩu cũ
        </label>
        <input
          id="fullName"
          placeholder='Nhập mật khẩu cũ'
          type="text"
          className="border flex-grow border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center mb-8">
        <label
          htmlFor="fullName"
          className="text-sm font-semibold mr-12 min-w-[120px] max-w-[120px]"
        >
          Mật khẩu mới 
        </label>
        <input
          id="fullName"
          placeholder='Nhập mật khẩu mới'
          type="text"
          className="border flex-grow border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center mb-8">
        <label
          htmlFor="fullName"
          className="text-sm font-semibold mr-12 min-w-[120px] max-w-[120px]"
        >
          Nhập lại mật khẩu mới
        </label>
        <input
          id="fullName"
          placeholder='Nhập mật khẩu mới'
          type="text"
          className="border flex-grow border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
    <div className="px-14 pb-12 flex justify-between items-center">
      <button className="py-1 px-8 bg-[#757575] rounded-md text-white font-bold hover:opacity-80 hover:transition-all ">Hủy</button>
      <button className="py-1 px-8 bg-[#0A2273] rounded-md text-white font-bold hover:opacity-80 hover:transition-all" >Lưu</button>
    </div>
  </div>
  )
} 