import React, { useState } from "react";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import Banner from "../Component/Banner/Banner";
import icon_1 from "../assets/img/Vector-1.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCalendar, faMessage, faSquarePen, faStreetView, faUser, } from "@fortawesome/free-solid-svg-icons";


const dataNav = [
  {
    id: 1,
    title: "Danh sách ý tưởng",
    link: "/danh-sach-y-tuong",
     icon : faSquarePen
  },
  {
    id: 2,
    title: "Lịch sử quan tâm",
    link: "/lich-su",
    icon : faCalendar
  },
  {
    id: 3,
    title: "Cộng đồng",
    link: "/cong-dong",
    icon : faStreetView
  },
  {
    id: 4,
    title: "Hồ sơ Nhà đầu tư",
    link: "/ho-so-nha-dau-tu",
    icon : faUser
  },
  {
    id: 5,
    title: "Chat AI hỗ trợ",
    link: "/chat-ai-ho-tro",
    icon : faMessage
  }
  // {
  //   id: 6,
  //   title: "Cài đặt",
  //   link: "/cai-dat",
  // },

];
export default function LayoutInvestor({ children , title , decs }) {
  const [activeNav , setActiveNav] = useState(1)
  const renderNav = () => {
    
    return dataNav.map((item, index) => {
      return <>
      <NavLink onClick={() => {
        handleChangeIndexNav(item.id)
      }} key={item.id} to={item.link} className="flex items-center pl-[60px] group py-6">
        <FontAwesomeIcon icon={item.icon} className={activeNav === item.id ? "w-5 h-5 mr-3 text-[#0A2273]  group-hover:opacity-70 group-hover:transition-all " : "w-5 h-5 mr-3 group-hover:opacity-70 group-hover:transition-all"}></FontAwesomeIcon>
        <h3 className={activeNav === item.id ? "text-base font-bold text-[#0A2273] group-hover:opacity-70 group-hover:transition-all": "text-base font-medium text-[#000000] group-hover:opacity-70 group-hover:transition-all"}>{item.title}</h3>
      </NavLink>
      </>
    })

  }

  const handleChangeIndexNav = (indexItem) => {
    setActiveNav(indexItem)
  }
  return (
    <div className="bg-[#f1f1f1]">
      <Header />
      <div className="px-[156px]">
      <Banner title={title} decs={decs} />
      <div className="px-6 py-5 grid grid-cols-4 gap-4 bg-white " >
        <div className=" col-span-1 max-h-[432px] border rounded-lg border-[#75757578]/[47%]">
          {renderNav()}
          <NavLink className="flex items-center justify-center hover:opacity-70 hover:transition-all group py-6 bg-[#0A2273] rounded-bl-lg rounded-br-lg" to="/cai-dat">
        <h3 className="text-base font-medium group-hover:opacity-70 group-hover:transition-all text-white">Cài đặt</h3>
      </NavLink>
        </div>
        <div className="col-span-3 ">
        {children}
        </div> 
        </div>
      </div>
      <Footer />
    </div>
  );
}
