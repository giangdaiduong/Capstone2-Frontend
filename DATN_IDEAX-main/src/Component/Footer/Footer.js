import React from "react";
import logo from "../../assets/img/Rectangle 1149.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFaceAngry } from "@fortawesome/free-regular-svg-icons/faFaceAngry";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className="bg-[#F2F5FC] px-[180px] py-[130px]">
      <div className="mb-4">
        <img src={logo} alt="logo" />
      </div>
      <div className="flex justify-between">
        <div className="w-4/5">
          <div className="flex justify-between items-center">
            <ul>
              <h3 className="text-xl font-semibold mb-2 ">Thông tin liên hệ</h3>
              <li className="flex items-center group py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 mr-2 group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>

                <NavLink
                  className="group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer  font-medium no-underline"
                  to=""
                >
                 
                  +(123) 456-7890
                </NavLink>
              </li>
              <li className="flex items-center group py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 mr-2 group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <NavLink
                  className="group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer  font-medium no-underline"
                  to=""
                >
                 
                  ideax@gmail.com
                </NavLink>
              </li>
            </ul>
            <ul>
              <h3 className="text-xl font-semibold mb-2 ">Sàn Ý Tưởng</h3>
              <li className="flex items-center group py-2">
                <NavLink
                  className="group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer font-normal no-underline"
                  to=""
                >
                  Đăng ý tưởng
                </NavLink>
              </li>
              <li className="flex items-center group py-2">
                <NavLink
                  className="group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer font-normal no-underline"
                  to=""
                >
                  Bán ý tưởng
                </NavLink>
              </li>
              <li className="flex items-center group py-2">
                <NavLink
                  className="group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer font-normal no-underline"
                  to=""
                >
                  Mua ý tưởng
                </NavLink>
              </li>
            </ul>
            <ul>
              <h3 className="text-xl font-semibold mb-2 ">Lĩnh vực</h3>
              <li className="flex items-center group py-2">
                <NavLink
                  className="group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer font-normal no-underline"
                  to=""
                >
                  Công nghệ
                </NavLink>
              </li>
              <li className="flex items-center group py-2">
                <NavLink
                  className="group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer font-normal no-underline"
                  to=""
                >
                  Tài chính
                </NavLink>
              </li>
              <li className="flex items-center group py-2">
                <NavLink
                  className="group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer font-normal no-underline"
                  to=""
                >
                  Y tế
                </NavLink>
              </li>
            </ul>
            <ul>
              <h3 className="text-xl font-semibold mb-2 ">Khu vực</h3>
              <li className="flex items-center group py-2">
                <NavLink
                  className="group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer font-normal no-underline"
                  to=""
                >
                  Hà Nội
                </NavLink>
              </li>
              <li className="flex items-center group py-2">
                <NavLink
                  className="group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer font-normal no-underline"
                  href=""
                >
                  Đà Nẵng
                </NavLink>
              </li>
              <li className="flex items-center group py-2">
                <NavLink
                  className="group-hover:opacity-75 group-hover:transition-all group-hover:duration-200 cursor-pointer font-normal no-underline"
                  to=""
                >
                  Hồ Chí Minh
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/5 flex flex-col  items-end">
        <h3 className="mb-6 font-medium text-xl text-[#000000]/[52%]">Kết nối với IdeaX</h3>
            <div className="flex items-center">
            <NavLink className="w-6 h-6 flex items-center justify-center no-underline bg-[#343C74] text-white rounded-full hover:opacity-75 hover:transition-all mx-3" to="">
            <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
            </NavLink>
            <NavLink className="w-6 h-6 flex items-center justify-center no-underline bg-[#343C74] text-white rounded-full hover:opacity-75 hover:transition-all mx-3" to="">
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
            </NavLink>
            <NavLink className="w-6 h-6 flex items-center justify-center no-underline bg-[#343C74] text-white rounded-full hover:opacity-75 hover:transition-all mx-3" to="">
            <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
            </NavLink>
            </div>
        </div>
      </div>
    </div>
  );
}
