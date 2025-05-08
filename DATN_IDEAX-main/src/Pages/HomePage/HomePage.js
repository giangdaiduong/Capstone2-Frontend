import React from "react";
import logo from "../../assets/img/Rectangle 1149.png";
import search from "../../assets/img/Vector.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUser } from "@fortawesome/free-regular-svg-icons";
import { faChevronUp} from "@fortawesome/free-solid-svg-icons";
import banner from "../../assets/img/Rectangle 41.png";
import tag_icon from "../../assets/img/Tag__icon.png";
import { Pagination } from "@mui/material";
import Footer from "../../Component/Footer/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import author_1 from "../../assets/img/Ellipse 368.png";
import author_2 from "../../assets/img/Ellipse 369.png";
import author_3 from "../../assets/img/Ellipse 368 (1).png";

export default function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="">
      {/* //header */}
      <div className="bg-white flex items-center justify-between px-20 py-1 shadow-md">
        <div className="header__logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="flex items-center justify-between flex-grow px-20">
          <li className="list-none">
            <NavLink
              className="no-underline text-xl font-semibold text-[#212f3f] hover:opacity-75 hover:transition-all"
              to=""
            >
              Trang Chủ
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              className="no-underline text-xl font-semibold text-[#212f3f] hover:opacity-75 hover:transition-all"
              to=""
            >
              Sàn Ý Tưởng
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              className="no-underline text-xl font-semibold text-[#212f3f] hover:opacity-75 hover:transition-all"
              to=""
            >
              Cộng Đồng
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              className="no-underline text-xl font-semibold text-[#212f3f] hover:opacity-75 hover:transition-all"
              to=""
            >
              Các dịch vụ khác
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#fef2f2] to-[#0a2273] focus:outline-none flex items-center justify-center mr-11 hover:opacity-75 hover:cursor-pointer">
            <img src={search} alt />
          </div>
          <div className="flex items-center hover:opacity-75 hover:cursor-pointer hover:transition-all">
            <div className="flex items-center mr-8">
              <FontAwesomeIcon
                className="text-2xl text-[#9f85ae] hover:opacity-75 hover:transition-all"
                icon={faUser}
              />
              <h3 className="text-[#9285a9] font-bold text-xl leading-6 ml-4">
                Nguyễn Văn A
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-2xl text-[#636991]"
                icon={faChevronUp}
              />
              <i className="fa-solid fa-chevron-up user__infor--icon" />
            </div>
          </div>
        </div>
      </div>
      {/* //banner */}
      <div className="bg-[#b0b0b0] px-12 ">
        <div className="w-full h-[350px] relative">
          <img className="w-full h-full object-cover" src={banner} alt="" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
            <h3 className="font-normal text-[85px] text-[#0A2273] tracking-wide">
              IDEAX
            </h3>
          </div>
        </div>
        {/* outstanding */}
        <div class="bg-white px-5 py-6">
          <h2 class="text-2xl text-[#0a2273] font-bold mb-7">
            NHỮNG Ý TƯỞNG NỔI BẬT TRONG TUẦN
          </h2>
          <div class="grid grid-cols-3 gap-5">
            <div class="w-[320px] h-[200px] min-w-full rounded-xl relative bg-gradient-to-b from-[#FFFFFF] to-[#999999] hover:opacity-90 hover:cursor-pointer hover:transition-all shadow-xl">
              <div class="absolute w-[280px] left-1/2 bottom-[5%] translate-x-[-50%] translate-y-[-5%]">
                <h3 class="font-medium text-xl leading-8 text-white pb-3">
                  Camera phát hiện người và vật trong xe
                </h3>
                <div class="flex items-center pt-[10px] border-t border-white">
                  <div class="w-9 h-9 rounded-full bg-[#343c74] flex items-center justify-center mr-4">
                    <img src={tag_icon} alt="" />
                  </div>
                  <div class="text-base text-white font-medium leading-6">
                    <h3>Công Nghệ - Kỹ Thuật</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[320px] h-[200px] min-w-full rounded-xl relative bg-gradient-to-b from-[#FFFFFF] to-[#999999] hover:opacity-90 hover:cursor-pointer hover:transition-all shadow-xl">
              <div class="absolute w-[280px] left-1/2 bottom-[5%] translate-x-[-50%] translate-y-[-5%]">
                <h3 class="font-medium text-xl leading-8 text-white pb-3">
                  Camera phát hiện người và vật trong xe
                </h3>
                <div class="flex items-center pt-[10px] border-t border-white">
                  <div class="w-9 h-9 rounded-full bg-[#343c74] flex items-center justify-center mr-4">
                    <img src={tag_icon} alt="" />
                  </div>
                  <div class="text-base text-white font-medium leading-6">
                    <h3>Công Nghệ - Kỹ Thuật</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[320px] h-[200px] min-w-full rounded-xl relative bg-gradient-to-b from-[#FFFFFF] to-[#999999] hover:opacity-90 hover:cursor-pointer hover:transition-all shadow-xl">
              <div class="absolute w-[280px] left-1/2 bottom-[5%] translate-x-[-50%] translate-y-[-5%]">
                <h3 class="font-medium text-xl leading-8 text-white pb-3">
                  Camera phát hiện người và vật trong xe
                </h3>
                <div class="flex items-center pt-[10px] border-t border-white">
                  <div class="w-9 h-9 rounded-full bg-[#343c74] flex items-center justify-center mr-4">
                    <img src={tag_icon} alt="" />
                  </div>
                  <div class="text-base text-white font-medium leading-6">
                    <h3>Công Nghệ - Kỹ Thuật</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[320px] h-[200px] min-w-full rounded-xl relative bg-gradient-to-b from-[#FFFFFF] to-[#999999] hover:opacity-90 hover:cursor-pointer hover:transition-all shadow-xl">
              <div class="absolute w-[280px] left-1/2 bottom-[5%] translate-x-[-50%] translate-y-[-5%]">
                <h3 class="font-medium text-xl leading-8 text-white pb-3">
                  Camera phát hiện người và vật trong xe
                </h3>
                <div class="flex items-center pt-[10px] border-t border-white">
                  <div class="w-9 h-9 rounded-full bg-[#343c74] flex items-center justify-center mr-4">
                    <img src={tag_icon} alt="" />
                  </div>
                  <div class="text-base text-white font-medium leading-6">
                    <h3>Công Nghệ - Kỹ Thuật</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[320px] h-[200px] min-w-full rounded-xl relative bg-gradient-to-b from-[#FFFFFF] to-[#999999] hover:opacity-90 hover:cursor-pointer hover:transition-all shadow-xl">
              <div class="absolute w-[280px] left-1/2 bottom-[5%] translate-x-[-50%] translate-y-[-5%]">
                <h3 class="font-medium text-xl leading-8 text-white pb-3">
                  Camera phát hiện người và vật trong xe
                </h3>
                <div class="flex items-center pt-[10px] border-t border-white">
                  <div class="w-9 h-9 rounded-full bg-[#343c74] flex items-center justify-center mr-4">
                    <img src={tag_icon} alt="" />
                  </div>
                  <div class="text-base text-white font-medium leading-6">
                    <h3>Công Nghệ - Kỹ Thuật</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[320px] h-[200px] min-w-full rounded-xl relative bg-gradient-to-b from-[#FFFFFF] to-[#999999] hover:opacity-90 hover:cursor-pointer hover:transition-all shadow-xl">
              <div class="absolute w-[280px] left-1/2 bottom-[5%] translate-x-[-50%] translate-y-[-5%]">
                <h3 class="font-medium text-xl leading-8 text-white pb-3">
                  Camera phát hiện người và vật trong xe
                </h3>
                <div class="flex items-center pt-[10px] border-t border-white">
                  <div class="w-9 h-9 rounded-full bg-[#343c74] flex items-center justify-center mr-4">
                    <img src={tag_icon} alt="" />
                  </div>
                  <div class="text-base text-white font-medium leading-6">
                    <h3>Công Nghệ - Kỹ Thuật</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[320px] h-[200px] min-w-full rounded-xl relative bg-gradient-to-b from-[#FFFFFF] to-[#999999] hover:opacity-90 hover:cursor-pointer hover:transition-all shadow-xl">
              <div class="absolute w-[280px] left-1/2 bottom-[5%] translate-x-[-50%] translate-y-[-5%]">
                <h3 class="font-medium text-xl leading-8 text-white pb-3">
                  Camera phát hiện người và vật trong xe
                </h3>
                <div class="flex items-center pt-[10px] border-t border-white">
                  <div class="w-9 h-9 rounded-full bg-[#343c74] flex items-center justify-center mr-4">
                    <img src={tag_icon} alt="" />
                  </div>
                  <div class="text-base text-white font-medium leading-6">
                    <h3>Công Nghệ - Kỹ Thuật</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[320px] h-[200px] min-w-full rounded-xl relative bg-gradient-to-b from-[#FFFFFF] to-[#999999] hover:opacity-90 hover:cursor-pointer hover:transition-all shadow-xl">
              <div class="absolute w-[280px] left-1/2 bottom-[5%] translate-x-[-50%] translate-y-[-5%]">
                <h3 class="font-medium text-xl leading-8 text-white pb-3">
                  Camera phát hiện người và vật trong xe
                </h3>
                <div class="flex items-center pt-[10px] border-t border-white">
                  <div class="w-9 h-9 rounded-full bg-[#343c74] flex items-center justify-center mr-4">
                    <img src={tag_icon} alt="" />
                  </div>
                  <div class="text-base text-white font-medium leading-6">
                    <h3>Công Nghệ - Kỹ Thuật</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[320px] h-[200px] min-w-full rounded-xl relative bg-gradient-to-b from-[#FFFFFF] to-[#999999] hover:opacity-90 hover:cursor-pointer hover:transition-all shadow-xl">
              <div class="absolute w-[280px] left-1/2 bottom-[5%] translate-x-[-50%] translate-y-[-5%]">
                <h3 class="font-medium text-xl leading-8 text-white pb-3">
                  Camera phát hiện người và vật trong xe
                </h3>
                <div class="flex items-center pt-[10px] border-t border-white">
                  <div class="w-9 h-9 rounded-full bg-[#343c74] flex items-center justify-center mr-4">
                    <img src={tag_icon} alt="" />
                  </div>
                  <div class="text-base text-white font-medium leading-6">
                    <h3>Công Nghệ - Kỹ Thuật</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[320px] h-[200px] min-w-full rounded-xl relative bg-gradient-to-b from-[#FFFFFF] to-[#999999] hover:opacity-90 hover:cursor-pointer hover:transition-all shadow-xl">
              <div class="absolute w-[280px] left-1/2 bottom-[5%] translate-x-[-50%] translate-y-[-5%]">
                <h3 class="font-medium text-xl leading-8 text-white pb-3">
                  Camera phát hiện người và vật trong xe
                </h3>
                <div class="flex items-center pt-[10px] border-t border-white">
                  <div class="w-9 h-9 rounded-full bg-[#343c74] flex items-center justify-center mr-4">
                    <img src={tag_icon} alt="" />
                  </div>
                  <div class="text-base text-white font-medium leading-6">
                    <h3>Công Nghệ - Kỹ Thuật</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[320px] h-[200px] min-w-full rounded-xl relative bg-gradient-to-b from-[#FFFFFF] to-[#999999] hover:opacity-90 hover:cursor-pointer hover:transition-all shadow-xl">
              <div class="absolute w-[280px] left-1/2 bottom-[5%] translate-x-[-50%] translate-y-[-5%]">
                <h3 class="font-medium text-xl leading-8 text-white pb-3">
                  Camera phát hiện người và vật trong xe
                </h3>
                <div class="flex items-center pt-[10px] border-t border-white">
                  <div class="w-9 h-9 rounded-full bg-[#343c74] flex items-center justify-center mr-4">
                    <img src={tag_icon} alt="" />
                  </div>
                  <div class="text-base text-white font-medium leading-6">
                    <h3>Công Nghệ - Kỹ Thuật</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center text-white py-6">
            <Pagination
              // count={totalPages}
              count={50}
              variant="outlined"
              color="secondary"
              sx={{
                "Button.MuiPaginationItem-circular.Mui-selected": {
                  color: "#042343",
                  bgcolor: "#042343",
                  fontWeight: "bold",
                },
                "Button.MuiButtonBase-root.MuiPaginationItem-root": {
                  bgcolor: "#BCBCBC",
                },
              }}
              // size={resize > 1024 ? "large" : "medium"}
              page={1}
              // onChange={(e, page) => handleChange(e, page)}
            />
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#6c7cba]/[45%] to-[#6c7cba]/[100%] px-6 py-10">
          <div>
            <h2 className="text-[26px] font-bold text-[#0A2273] mb-5">
              NHỮNG Ý TƯỞNG MỚI NHẤT ĐANG ĐƯỢC GIAO DỊCH
            </h2>
            <table className="w-full text-left ">
              <thead className="text-xs text-[#0A2273] bg-[#9FBCEAD9]/[85%]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xl font-bold text-[#0A2273]"
                  >
                    STT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xl font-bold text-[#0A2273]"
                  >
                    Tên tác giả
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xl font-bold text-[#0A2273]"
                  >
                    Nội dung ý tưởng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xl font-bold text-[#0A2273]"
                  >
                    Mã số giao dịch
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xl font-bold text-[#0A2273]"
                  >
                    Đăng ngày
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đoàn Văn Hiếu
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Nồi cơm điện thông minh nấu qua app điện thoại
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    DDT-261224
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    26/12/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    2
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Trần Phúc Tiên
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Theo dõi thiết bị tiêu thụ điện
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    DDT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    12/10/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center justify-center mt-8 mb-10">
              <button className="bg-[#0A2273] rounded-lg hover:opacity-80 hover:transition-all">
                <NavLink className="px-8 py-3 no-underline font-bold text-white text-xl  block">
                  Xem thêm
                </NavLink>
              </button>
            </div>
          </div>

          {/* table 2 */}

          <div>
            <h2 className="text-[26px] font-bold text-[#0A2273] mb-5">
              NHỮNG Ý TƯỞNG ĐANG ĐƯỢC GIAO DỊCH
            </h2>
            <table className="w-full text-left ">
              <thead className="text-xs text-[#0A2273] bg-[#9FBCEAD9]/[85%]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xl font-bold text-[#0A2273]"
                  >
                    STT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xl font-bold text-[#0A2273]"
                  >
                    Tên tác giả
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xl font-bold text-[#0A2273]"
                  >
                    Nội dung ý tưởng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xl font-bold text-[#0A2273]"
                  >
                    Mã số giao dịch
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-xl font-bold text-[#0A2273]"
                  >
                    Đăng ngày
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đoàn Văn Hiếu
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Nồi cơm điện thông minh nấu qua app điện thoại
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    DDT-261224
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    26/12/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    2
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Trần Phúc Tiên
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Theo dõi thiết bị tiêu thụ điện
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    DDT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    12/10/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-[#b7b9ce] border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-[#0A2273] tex whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Đinh Văn Dũng
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    Xây dựng lắp ghép.
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    CNKT-22112024
                  </td>
                  <td className="px-6 py-3 font-medium text-[#0A2273] text-base">
                    21/09/2024
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center justify-center mt-8 mb-10">
              <button className="bg-[#0A2273] rounded-lg hover:opacity-80 hover:transition-all">
                <NavLink className="px-8 py-3 no-underline font-bold text-white text-xl  block">
                  Xem thêm
                </NavLink>
              </button>
            </div>
          </div>
        </div>

        <div>
          <div class="bg-[#d6d7db] p-9">
            <div class="flex items-center justify-center flex-col">
              <h3 class="text-xl font-bold text-[#0a2273] mb-5 text-center">
                TRIẾT LÝ NHÀ SÁNG NGHIỆP
              </h3>
              <div class="entrepreneur__line w-[140px] h-[5px] bg-[#0a2273] rounded-md"></div>
              <p class="w-[600px] text-center text-[#333333] mt-6 text-base ">
                Những câu nói “để đời” của các tỷ phú hàng đầu thế giới luôn là
                kim chỉ nam và là nguồn cảm hứng bất tận cho hàng triệu người
                trên con đường tìm đến thành công của chính mình.
              </p>
            </div>
            <div class="mt-20 px-20">
              <Slider {...settings}>
              <div className="px-2">
              <div  className="relative flex justify-center py-10 w-[300px/!important] max-w-full mr-2">
            {/* Card content */}
            <div className="bg-white rounded-xl shadow-lg pt-16 pb-8 px-6 text-center relative w-full">
              {/* Avatar */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <img
                  src={author_1}
                  alt="Author"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <p className="italic text-gray-700 mb-4 min-h-[120px]">“Đừng để tiếng ồn từ những ý kiến khác nhân chìm tiếng nói sâu thẳm trong lòng bạn. Và điều quan trọng nhất là hãy can đảm để đi theo tiếng gọi của trái tim và trực giác của mình”</p>
              <h3 className="font-bold text-base mb-2">Mr. Steve Job</h3>
              <p className="text-sm text-gray-500">Cựu CEO Apple</p>
            </div>
          </div>
              </div>
              <div className="px-2">
              <div  className="relative flex justify-center py-10 w-[300px/!important] max-w-full mr-2">
            {/* Card content */}
            <div className="bg-white rounded-xl shadow-lg pt-16 pb-8 px-6 text-center relative w-full">
              {/* Avatar */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <img
                  src={author_2}
                  alt="Author"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <p className="italic text-gray-700 mb-4 min-h-[120px]">“Nếu bạn không muốn bị hiểu lầm hay chỉ trích, thì hãy làm ơn, đừng làm gì mới mẻ hay sáng tạo cả”</p>
              <h3 className="font-bold text-base mb-2">Mr. Jeff Bezos</h3>
              <p className="text-sm text-gray-500">Ông chủ bán hàng trực tuyến Amazon</p>
            </div>
          </div>
              </div>
              <div className="px-2">
              <div  className="relative flex justify-center py-10 w-[300px/!important] max-w-full mr-2">
            {/* Card content */}
            <div className="bg-white rounded-xl shadow-lg pt-16 pb-8 px-6 text-center relative w-full">
              {/* Avatar */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <img
                  src={author_3}
                  alt="Author"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <p className="italic text-gray-700 mb-4 min-h-[120px]">“Lở làm người, rồi không thể sống một cuộc đời phí hoài được” “Mục tiêu của tôi không có gì thay đổi, về bản chất vẫn là làm đẹp cho đời”</p>
              <h3 className="font-bold text-base mb-2">Ông Phạm Nhật Vượng </h3>
              <p className="text-sm text-gray-500">Tỷ phú - Chủ tịch tập đoàn Vingroup</p>
            </div>
          </div>
              </div>
              <div className="px-2">
              <div  className="relative flex justify-center py-10 w-[300px/!important] max-w-full mr-2">
            {/* Card content */}
            <div className="bg-white rounded-xl shadow-lg pt-16 pb-8 px-6 text-center relative w-full">
              {/* Avatar */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <img
                  src={author_1}
                  alt="Author"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <p className="italic text-gray-700 mb-4 min-h-[120px]">“Đừng để tiếng ồn từ những ý kiến khác nhân chìm tiếng nói sâu thẳm trong lòng bạn. Và điều quan trọng nhất là hãy can đảm để đi theo tiếng gọi của trái tim và trực giác của mình”</p>
              <h3 className="font-bold text-base mb-2">Mr. Steve Job</h3>
              <p className="text-sm text-gray-500">Cựu CEO Apple</p>
            </div>
          </div>
              </div>
              <div className="px-2">
              <div  className="relative flex justify-center py-10 w-[300px/!important] max-w-full mr-2">
            {/* Card content */}
            <div className="bg-white rounded-xl shadow-lg pt-16 pb-8 px-6 text-center relative w-full">
              {/* Avatar */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <img
                  src={author_2}
                  alt="Author"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <p className="italic text-gray-700 mb-4 min-h-[120px]">“Nếu bạn không muốn bị hiểu lầm hay chỉ trích, thì hãy làm ơn, đừng làm gì mới mẻ hay sáng tạo cả”</p>
              <h3 className="font-bold text-base mb-2">Mr. Jeff Bezos</h3>
              <p className="text-sm text-gray-500">Ông chủ bán hàng trực tuyến Amazon</p>
            </div>
          </div>
              </div>
              <div className="px-2">
              <div  className="relative flex justify-center py-10 w-[300px/!important] max-w-full mr-2">
            {/* Card content */}
            <div className="bg-white rounded-xl shadow-lg pt-16 pb-8 px-6 text-center relative w-full">
              {/* Avatar */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <img
                  src={author_3}
                  alt="Author"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <p className="italic text-gray-700 mb-4 min-h-[120px]">“Lở làm người, rồi không thể sống một cuộc đời phí hoài được” “Mục tiêu của tôi không có gì thay đổi, về bản chất vẫn là làm đẹp cho đời”</p>
              <h3 className="font-bold text-base mb-2">Ông Phạm Nhật Vượng </h3>
              <p className="text-sm text-gray-500">Tỷ phú - Chủ tịch tập đoàn Vingroup</p>
            </div>
          </div>
              </div>
              
          

      
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {/* footer
      <div class="bg-white py-[50px] px-[180px]">
        <div class="pb-5">
          <img src={logos} alt="" />
        </div>
        <div class="flex">
          <div class="flex items-center w-4/5 justify-between">
            <ul class="list-none">
              <h3 className="font-semibold text-xl pb-4 text-black">Thông tin liên hệ</h3>
              <li class="mb-5">   
                <FontAwesomeIcon className="mr-2 text-xl" icon={faPhone}/>
                <NavLink to=""> +(123) 456-7890</NavLink>
              </li>
              <li class="mb-5">
                <FontAwesomeIcon className="mr-2 text-xl" icon={faEnvelope}/>
                <NavLink to=""> ideax@gmail.com</NavLink>
              </li>
            </ul>
            <ul class="list-none">
              <h3 className="font-semibold text-xl pb-4 text-black">Sàn Ý Tưởng</h3>
              <li class="mb-5">   
              
                <NavLink to=""> Đăng ý tưởng</NavLink>
              </li>
              <li class="mb-5">
                
                <NavLink to=""> Bán ý tưởng</NavLink>
              </li>
              <li class="mb-5">
                
                <NavLink to=""> Mua ý tưởng</NavLink>
              </li>
            </ul>
            <ul class="list-none">
              <h3 className="font-semibold text-xl pb-4 text-black">Lĩnh vực</h3>
              <li class="mb-5">   
              
                <NavLink to=""> Công Nghệ</NavLink>
              </li>
              <li class="mb-5">
                
                <NavLink to=""> Y Tế</NavLink>
              </li>
              <li class="mb-5">
                
                <NavLink to=""> Tài Chính</NavLink>
              </li>
            </ul>
            <ul class="list-none">
              <h3 className="font-semibold text-xl pb-4 text-black">Khu vực</h3>
              <li class="mb-5">   
              
                <NavLink to=""> Hà Nội</NavLink>
              </li>
              <li class="mb-5">
                
                <NavLink to=""> Đà Nẵng</NavLink>
              </li>
              <li class="mb-5">
                
                <NavLink to=""> Hồ Chí Minh</NavLink>
              </li>
            </ul>
          </div>
          <div class="w-1/5 flex flex-col items-center">
            <h3 className="mb-[22px] font-medium text-xl text-[#00000085]/[52%]">Kết nối với IdeaX</h3>
            <div class="footer__contact-social">
              <NavLink className="no-underline">
                <FontAwesomeIcon className="text-[#343c74] mr-7 text-xl hover:opacity-75 hover:cursor-pointer hover:transition-all" icon={faFacebook}/>
              </NavLink>
              <NavLink className="no-underline">
                <FontAwesomeIcon className="text-[#343c74] mr-7 text-xl hover:opacity-75 hover:cursor-pointer hover:transition-all" icon={faTwitter}/>
              </NavLink>
              <NavLink className="no-underline">
                <FontAwesomeIcon className="text-[#343c74] mr-7 text-xl hover:opacity-75 hover:cursor-pointer hover:transition-all" icon={faInstagram}/>
              </NavLink>

            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
