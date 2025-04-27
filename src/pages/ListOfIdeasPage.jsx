import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons/faCheckDouble";
import { useNavigate } from "react-router-dom";
import {
  faCalendarPlus,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { Pagination } from "@mui/material";
import axios from "axios";

export default function ListOfIdeasPage() {
  const navigate = useNavigate();
  const [listDataAll, setListDataAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [resize, setResize] = useState(1025);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5182/v1/api/client/Ideas?pageIndex=${currentPage - 1}&pageSize=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setListDataAll(response.data.items || []);
        setTotalPages(Math.ceil((response.data.total || 1) / 10));
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ý tưởng:", error);
      }
    };
    fetchIdeas();
  }, [currentPage]);

  const handleChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleNavigateToDetail = (ideaId) => {
    navigate(`/investor/idea-detail/${ideaId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-end mb-6">
        <h3 className="text-[#0F172A] text-base font-normal">Lĩnh vực</h3>
        <form className="w-32 px-2">
          <select
            id="countries"
            className="bg-gray-50 border px-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Tất cả</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </form>
      </div>
      {listDataAll.map((idea) => (
        <div
          key={idea.id}
          className="border border-[#75757578]/[47%] rounded-xl mb-3 cursor-pointer"
          onClick={() => handleNavigateToDetail(idea.id)}
        >
          <div className="py-3 bg-[#adc6ee] px-6 rounded-tl-xl rounded-tr-xl border border-tl-[#adc6ee] border-tr-[#adc6ee]">
            <div className="flex items-center justify-between">
              <h4 className="text-[#0A2273] font-semibold text-base">
                {idea.title}
              </h4>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faTags}
                  className="w-5 h-5 mr-3 text-[#FBF30F]  group-hover:opacity-70 group-hover:transition-all "
                ></FontAwesomeIcon>
                <h4 className="text-sm font-bold text-[#FBF30F]">
                  {idea.status === "Pending" ? "Tìm nhà đầu tư" : idea.status}
                </h4>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  className="w-5 h-5 mr-3 text-teal-500 group-hover:opacity-70 group-hover:transition-all "
                ></FontAwesomeIcon>
                <p className="text-xs font-normal text-[#0A2273]">
                  {idea.copyrightStatus ? "Đã đăng ký bản quyền" : "Chưa đăng ký bản quyền"}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-[#0A2273]"
                  icon={faUser}
                ></FontAwesomeIcon>
                <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                  {idea.initiator}
                </h3>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-[#0A2273]"
                  icon={faCalendarPlus}
                ></FontAwesomeIcon>
                <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                  Ngày đăng: {idea.createdOn ? new Date(idea.createdOn).toLocaleDateString() : "-"}
                </h3>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-[#0A2273]"
                  icon={faTags}
                ></FontAwesomeIcon>
                <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                  Lĩnh vực: <span className="ml-1 font-bold">{idea.category}</span>
                </h3>
              </div>
            </div>
          </div>
          <div className="px-6 py-3">
            <h3 className="font-medium text-sm pb-2">Tóm tắt ý tưởng</h3>
            <p className="font-medium text-sm mb-4">
              {idea.description}
            </p>
          </div>
          <div className="flex items-center justify-between px-6 py-3 border-t border-[#75757578]/[47%]">
            <div className="p-2 min-w-[120px] max-w-[120px] bg-[#0A2273] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
              <button className="flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="mr-2"
                ></FontAwesomeIcon>
                Quan Tâm
              </button>
            </div>
            <div 
              className="p-2 min-w-[120px] max-w-[120px] bg-[#0A2273] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToDetail(idea.id);
              }}
            >
              <button className="flex items-center justify-center">
                <FontAwesomeIcon icon={faBook} className="mr-2"></FontAwesomeIcon>
                Đọc tiếp
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center text-white py-6">
        <Pagination
          count={totalPages}
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
          page={currentPage}
          onChange={handleChange}
        />
      </div>
    </div>
  );
} 