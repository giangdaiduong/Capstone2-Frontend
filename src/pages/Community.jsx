import React from 'react'

export default function Community() {
  return (
    <div className="border border-gray-400 rounded-xl">      
    <div className="pt-6 pr-10 pb-10 pl-10">
    <h1 className="mb-6 text-xl font-bold">Tài Khoản</h1>
      <div className="flex items-center mb-8">
        <label
          htmlFor="fullName"
          className="text-sm font-semibold mr-12 min-w-[100px] max-w-[100px]"
        >
         Tên hiển thị
        </label>
        <input
          id="fullName"
          type="text"
          className="border flex-grow border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center mb-8">
        <label
          htmlFor="fullName"
          className="text-sm font-semibold mr-12 min-w-[100px] max-w-[120px]"
        >
          Email 
        </label>
        <input
          id="fullName"
          type="email"
          className="border flex-grow border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center mb-8">
        <label
          htmlFor="fullName"
          className="text-sm font-semibold mr-12 min-w-[100px] max-w-[120px]"
        >
          Số điện thoại
        </label>
        <input
          id="fullName"
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