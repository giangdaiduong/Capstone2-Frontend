import { faEarthAmericas, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import image from "../../assets/img/Frame 427319856.png";
import textImage from "../../assets/img/download.jfif";
import {
  faStar,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import ReactStars from "react-stars";
export default function Community() {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div>
      <div className=" rounded-[30px] border border-[#888888] mb-6">
        <div className="pt-4 px-8 pb-6">
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <img src={image} alt="" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold ">Nguyễn Văn A</h3>
              <div className="flex items-center ">
                <p className="text-xs font-medium text-[#757575]">
                  {" "}
                  10 tháng 2, 2025
                </p>
                <FontAwesomeIcon
                  className="text-sm text-[#757575] ml-1"
                  icon={faEarthAmericas}
                />
              </div>
            </div>
          </div>
          <p className="text-sm font-medium mb-4 leading-7">
            Ứng dụng này sử dụng trí tuệ nhân tạo để phân tích cách học của từng
            học sinh và tạo ra giáo trình phù hợp. Hệ thống có thể đề xuất bài
            tập, giải thích nội dung theo cách dễ hiểu nhất và theo dõi tiến độ
            học tập.
          </p>
          <h3 className="text-sm font-medium mb-8">
            <FontAwesomeIcon className="mr-3 text-base " icon={faTags} />
            Giáo dục, Công nghệ
          </h3>
          <div className="flex items-center justify-between">
            <div className="w-[195px] h-[115px] object-cover ">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={textImage}
                alt=""
              />
            </div>
            <div className="w-[195px] h-[115px] object-cover ">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={textImage}
                alt=""
              />
            </div>
            <div className="w-[195px] h-[115px] object-cover">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={textImage}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="line w-full h-[1px] bg-[#888888]"></div>
        <div>
          <div className="flex items-center justify-between px-8 py-5">
            <div className="flex items-center">
              <div className="flex items-center  min-w-20 justify-center bg-[#888888D6]/[84%] min-h-[36px] border-r border-white text-white rounded-tl-lg rounded-bl-lg cursor-pointer hover:opacity-80 hover:transition-all duration-300 ease-in-out">
                <FontAwesomeIcon icon={faThumbsUp} />
                <h3 className="ml-2">20</h3>
              </div>
              <div className="flex items-center min-w-20 justify-center bg-[#888888D6]/[84%] min-h-[36px] text-white rounded-tr-lg rounded-br-lg cursor-pointer hover:opacity-80 hover:transition-all duration-300 ease-in-out">
                <FontAwesomeIcon icon={faThumbsDown} />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <h3 className="text-base mr-2 font-bold">Đánh giá</h3>
              <ReactStars
                count={5}
                value={4}
                onChange={ratingChanged}
                size={24}
                color2={"#ffd700"}
              />
            </div>
          </div>
          <div className="px-8 py-5">
            <div className=" flex items-center mb-8">
              <img className="mr-4" src={image} alt="" />
              <input
                className="flex-grow px-3 py-2 border-b-[1px] border-[#D9D9D9] focus:outline-transparent focus:border-b-[1px]"
                type="text"
                placeholder="Viết bình luận ...."
              />
            </div>
            <div className="flex mb-8">
            <div className="mr-4">
              <img src={image} alt="" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold ">Nguyễn An</h3>
              <div className=" ">
                <p className="text-xs font-medium text-[#757575] leading-8">
                Ý tưởng hay! Bạn đã có kế hoạch tích hợp dữ liệu từ các nền tảng học tập hiện có chưa?
                </p>
                <div className="flex">
              <div className="flex items-center  min-w-14 min-h-[36px] text-[#757575]  cursor-pointer hover:opacity-80 hover:transition-all duration-300 ease-in-out">
                <FontAwesomeIcon icon={faThumbsUp} />
                <h3 className="ml-2">20</h3>
              </div>
              <div className="flex items-center min-w-14 min-h-[36px] text-[#757575] cursor-pointer hover:opacity-80 hover:transition-all duration-300 ease-in-out">
                <FontAwesomeIcon icon={faThumbsDown} />
              </div>
              <div className="flex items-center">
                <h3 className="text-[#334155] font-bold text-xs hover:opacity-80 hover:transition-all cursor-pointer"> Phản hồi </h3>
              </div>
            </div>

              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className=" rounded-[30px] border border-[#888888] mb-6">
        <div className="pt-4 px-8 pb-6">
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <img src={image} alt="" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold ">Nguyễn Văn A</h3>
              <div className="flex items-center ">
                <p className="text-xs font-medium text-[#757575]">
                  {" "}
                  10 tháng 2, 2025
                </p>
                <FontAwesomeIcon
                  className="text-sm text-[#757575] ml-1"
                  icon={faEarthAmericas}
                />
              </div>
            </div>
          </div>
          <p className="text-sm font-medium mb-4 leading-7">
            Ứng dụng này sử dụng trí tuệ nhân tạo để phân tích cách học của từng
            học sinh và tạo ra giáo trình phù hợp. Hệ thống có thể đề xuất bài
            tập, giải thích nội dung theo cách dễ hiểu nhất và theo dõi tiến độ
            học tập.
          </p>
          <h3 className="text-sm font-medium mb-8">
            <FontAwesomeIcon className="mr-3 text-base " icon={faTags} />
            Giáo dục, Công nghệ
          </h3>
          <div className="flex items-center justify-between">
            <div className="w-[195px] h-[115px] object-cover ">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={textImage}
                alt=""
              />
            </div>
            <div className="w-[195px] h-[115px] object-cover ">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={textImage}
                alt=""
              />
            </div>
            <div className="w-[195px] h-[115px] object-cover">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={textImage}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="line w-full h-[1px] bg-[#888888]"></div>
        <div>
          <div className="flex items-center justify-between px-8 py-5">
            <div className="flex items-center">
              <div className="flex items-center  min-w-20 justify-center bg-[#888888D6]/[84%] min-h-[36px] border-r border-white text-white rounded-tl-lg rounded-bl-lg cursor-pointer hover:opacity-80 hover:transition-all duration-300 ease-in-out">
                <FontAwesomeIcon icon={faThumbsUp} />
                <h3 className="ml-2">20</h3>
              </div>
              <div className="flex items-center min-w-20 justify-center bg-[#888888D6]/[84%] min-h-[36px] text-white rounded-tr-lg rounded-br-lg cursor-pointer hover:opacity-80 hover:transition-all duration-300 ease-in-out">
                <FontAwesomeIcon icon={faThumbsDown} />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <h3 className="text-base mr-2 font-bold">Đánh giá</h3>
              <ReactStars
                count={5}
                value={4}
                onChange={ratingChanged}
                size={24}
                color2={"#ffd700"}
              />
            </div>
          </div>
          <div className="px-8 py-5">
            <div className=" flex items-center mb-8">
              <img className="mr-4" src={image} alt="" />
              <input
                className="flex-grow px-3 py-2 border-b-[1px] border-[#D9D9D9] focus:outline-transparent focus:border-b-[1px]"
                type="text"
                placeholder="Viết bình luận ...."
              />
            </div>
            <div className="flex mb-8">
            <div className="mr-4">
              <img src={image} alt="" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold ">Nguyễn An</h3>
              <div className=" ">
                <p className="text-xs font-medium text-[#757575] leading-8">
                Ý tưởng hay! Bạn đã có kế hoạch tích hợp dữ liệu từ các nền tảng học tập hiện có chưa?
                </p>
                <div className="flex">
              <div className="flex items-center  min-w-14 min-h-[36px] text-[#757575]  cursor-pointer hover:opacity-80 hover:transition-all duration-300 ease-in-out">
                <FontAwesomeIcon icon={faThumbsUp} />
                <h3 className="ml-2">20</h3>
              </div>
              <div className="flex items-center min-w-14 min-h-[36px] text-[#757575] cursor-pointer hover:opacity-80 hover:transition-all duration-300 ease-in-out">
                <FontAwesomeIcon icon={faThumbsDown} />
              </div>
              <div className="flex items-center">
                <h3 className="text-[#334155] font-bold text-xs hover:opacity-80 hover:transition-all cursor-pointer"> Phản hồi </h3>
              </div>
            </div>

              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
