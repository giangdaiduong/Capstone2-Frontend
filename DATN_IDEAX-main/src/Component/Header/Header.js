import React from "react";
import logo from "../../assets/img/Rectangle 39.png";
import logo_search from "../../assets/img/Vector.png";
import logo_user from "../../assets/img/Vector (1).png";

export default function Header() {
  return (
    <div className="bg-white flex items-center justify-between px-20 py-2 shadow-md">
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <div className="flex items-center">
        <div className="w-11 h-11 rounded-full flex justify-center items-center bg-gradient-to-b from-[#FEF2F2] to-[#0A2273] hover:opacity-80 hover:cursor-pointer hover:transition-all ">
          <img src={logo_search} alt="Search" />
        </div>
        <div className="flex items-center ml-14 group">
          <div className="bg-[#E7E7E7]  w-[34px] h-[34px] rounded-full flex justify-center items-center group-hover:opacity-80 group-hover:cursor-pointer group-hover:transition-all">
            <img src={logo_user} alt="User" />
          </div>
          <div className="ml-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="size-5 cursor-pointer group-hover:opacity-75 group-hover:transition-all"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
