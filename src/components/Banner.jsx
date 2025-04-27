import React from "react";
import banner from "../assets/img/Rectangle 41.png";

export default function Banner(props) {
  const { title, decs } = props;
  return (
    <div className="w-full h-[220px] relative">
      <img className="w-full h-full object-cover" src={banner} alt="" />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <h3 className="font-bold text-[50px] text-[#0A2273] mb-4">{title}</h3>
        <p className="font-medium text-xl text-white">{decs}</p>
      </div>
    </div>
  );
}
