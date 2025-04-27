import React from "react";
import uploadImage from "../assets/img/Frame_427319864.png";

export default function ProfileInvestor() {
  return (
    <div className="border border-gray-400 rounded-xl">
      <div className="flex justify-between items-center px-8 pt-7">
        <div className="mr-8 flex-grow">
          <h1 className="mb-6 text-xl font-bold"> Thông tin cá nhân</h1>
          <div className="flex items-center mb-8">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold mr-12 min-w-[100px] max-w-[100px]"
            >
              Họ và Tên <span className="text-red-500 ml-1">(*)</span>
            </label>
            <input
              id="fullName"
              type="text"
              className="border flex-grow border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center mb-8 flex-grow">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold mr-12 min-w-[100px]  max-w-[100px]"
            >
              Chức danh <span className="text-red-500 ml-1">(*)</span>
            </label>
            <input
              id="fullName"
              type="text"
              className="border flex-grow  border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center mb-8 flex-grow">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold mr-12 min-w-[100px]  max-w-[100px]"
            >
              Công ty đang làm việc
            </label>
            <input
              id="fullName"
              type="text"
              className="border flex-grow  border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="w-[180px] h-[200px]">
          <img
            className="w-full h-full object-cover hover:opacity-80 hover:cursor-pointer hover:transition-all"
            src={uploadImage}
            alt="Upload Image"
          />
        </div>
      </div>
      <div className="pl-8 pr-[50px]">
        <div className="flex items-center mb-8">
          <label
            htmlFor="fullName"
            className="text-sm font-semibold mr-12 min-w-[100px] max-w-[100px]"
          >
            Email <span className="text-red-500 ml-1">(*)</span>
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
            Số điện thoại <span className="text-red-500 ml-1">(*)</span>
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
            Số điện thoại <span className="text-red-500 ml-1">(*)</span>
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
            Ngày sinh <span className="text-red-500 ml-1">(*)</span>
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
            Địa chỉ <span className="text-red-500 ml-1">(*)</span>
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
            Vai trò <span className="text-red-500 ml-1">(*)</span>
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
            Ngày tạo tài khoản <span className="text-red-500 ml-1">(*)</span>
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
            Ngày cập nhập gần nhất{" "}
            <span className="text-red-500 ml-1">(*)</span>
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
            LinkedIn hoặc website cá nhân{" "}
            <span className="text-red-500 ml-1">(*)</span>
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
            Giới thiệu bản thân <span className="text-red-500 ml-1">(*)</span>
          </label>
          <textarea
            id="introduction"
            rows={4}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue={""}
          />
        </div>
        <div className="flex items-center mb-8">
          <label
            htmlFor="fullName"
            className="text-sm font-semibold mr-12 min-w-[100px] max-w-[120px]"
          >
            Lĩnh vực quan tâm <span className="text-red-500 ml-1">(*)</span>
          </label>
          <div className="grid grid-cols-6 gap-4">
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#0A2273] text-white font-bold text-xs flex items-center justify-center font-normal">
              Công nghệ{" "}
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Y tế
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Ẩm thực
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Giải trí
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Du lịch
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Kinh doanh
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Quảng cáo
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#0A2273] text-white font-bold text-xs flex items-center justify-center font-normal">
              Công nghệ{" "}
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Y tế
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Ẩm thực
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Giải trí
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Du lịch
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Kinh doanh
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Quảng cáo
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#0A2273] text-white font-bold text-xs flex items-center justify-center font-normal">
              Công nghệ{" "}
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Y tế
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Ẩm thực
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Giải trí
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Du lịch
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Kinh doanh
            </h3>
            <h3 className="px-2 hover:cursor-pointer hover:opacity-80 hover:transition-all py-1 rounded bg-[#D9D9D9] text-xs flex items-center justify-center font-normal">
              Quảng cáo
            </h3>
          </div>
        </div>
      </div>
      <div className="px-14 pt-24 pb-12 flex justify-between items-center">
        <button className="py-1 px-8 bg-[#757575] rounded-md text-white font-bold hover:opacity-80 hover:transition-all ">Hủy</button>
        <button className="py-1 px-8 bg-[#0A2273] rounded-md text-white font-bold hover:opacity-80 hover:transition-all" >Lưu thay đổi</button>
      </div>
    </div>
  );
} 