import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons/faCheckDouble";
import {
  faCalendarPlus,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { Pagination } from "@mui/material";

export default function History() {
  const [listDataAll, setListDataAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [resize, setResize] = useState(1025);
  const handleChange = (e, page) => {
    setCurrentPage(page);
  };
  // useEffect(() => {
  //   getListMovieAllOfPages(currentPage)
  //     .then((res) => {
  //       setListMovieAll(res.data.items);
  //       setTotalPages(res.data.pagination.totalPages);
  //     })
  //     .catch((err) => {
  //       console.log("err: ", err);
  //     });
  // }, [currentPage]);

  // resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     setResize(window.innerWidth);
  //   };
  //   window.addEventListener("resize", handleResize);

  //   () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
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
      <div className=" border border-[#75757578]/[47%] rounded-xl mb-3">
        <div className="py-3 bg-[#adc6ee] px-6 rounded-tl-xl rounded-tr-xl border border-tl-[#adc6ee] border-tr-[#adc6ee]">
          <div className="flex items-center justify-between">
            <h4 className="text-[#0A2273] font-semibold text-base">
              Nền tảng AI hỗ trợ quản lý doanh nghiệp
            </h4>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faTags}
                className="w-5 h-5 mr-3 text-[#FBF30F]  group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <h4 className="text-sm font-bold text-[#FBF30F]">
                Tìm nhà đầu tư
              </h4>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCheckDouble}
                className="w-5 h-5 mr-3 text-teal-500 group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <p className="text-xs font-normal text-[#0A2273]">
                Đã đăng ký bản quyền
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
                Phạm Thanh Cảnh
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faCalendarPlus}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Ngày đăng: 10/2/2025
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faTags}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Lĩnh vực: <span className="ml-1 font-bold">Công nghệ</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="px-6 py-3">
          <h3 className="font-medium text-sm pb-2">Tóm tắt ý tưởng</h3>
          <p className="font-medium text-sm mb-4">
            Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động
            hóa quy trình quản lý doanh nghiệp, bao gồm:....
          </p>
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#75757578]/[47%]">
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#0A2273] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center">
              <FontAwesomeIcon icon={faBook} className="mr-2"></FontAwesomeIcon>
              Đọc tiếp
            </button>
          </div>
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#757575] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center ">
     
             Xóa
            </button>
          </div>
        </div>
      </div>
      <div className=" border border-[#75757578]/[47%] rounded-xl mb-3">
        <div className="py-3 bg-[#adc6ee] px-6 rounded-tl-xl rounded-tr-xl border border-tl-[#adc6ee] border-tr-[#adc6ee]">
          <div className="flex items-center justify-between">
            <h4 className="text-[#0A2273] font-semibold text-base">
              Nền tảng AI hỗ trợ quản lý doanh nghiệp
            </h4>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faTags}
                className="w-5 h-5 mr-3 text-[#FBF30F]  group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <h4 className="text-sm font-bold text-[#FBF30F]">
                Tìm nhà đầu tư
              </h4>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCheckDouble}
                className="w-5 h-5 mr-3 text-teal-500 group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <p className="text-xs font-normal text-[#0A2273]">
                Đã đăng ký bản quyền
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
                Phạm Thanh Cảnh
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faCalendarPlus}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Ngày đăng: 10/2/2025
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faTags}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Lĩnh vực: <span className="ml-1 font-bold">Công nghệ</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="px-6 py-3">
          <h3 className="font-medium text-sm pb-2">Tóm tắt ý tưởng</h3>
          <p className="font-medium text-sm mb-4">
            Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động
            hóa quy trình quản lý doanh nghiệp, bao gồm:....
          </p>
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#75757578]/[47%]">
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#0A2273] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center">
              <FontAwesomeIcon icon={faBook} className="mr-2"></FontAwesomeIcon>
              Đọc tiếp
            </button>
          </div>
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#757575] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center ">
     
             Xóa
            </button>
          </div>
        </div>
      </div>
      <div className=" border border-[#75757578]/[47%] rounded-xl mb-3">
        <div className="py-3 bg-[#adc6ee] px-6 rounded-tl-xl rounded-tr-xl border border-tl-[#adc6ee] border-tr-[#adc6ee]">
          <div className="flex items-center justify-between">
            <h4 className="text-[#0A2273] font-semibold text-base">
              Nền tảng AI hỗ trợ quản lý doanh nghiệp
            </h4>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faTags}
                className="w-5 h-5 mr-3 text-[#FBF30F]  group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <h4 className="text-sm font-bold text-[#FBF30F]">
                Tìm nhà đầu tư
              </h4>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCheckDouble}
                className="w-5 h-5 mr-3 text-teal-500 group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <p className="text-xs font-normal text-[#0A2273]">
                Đã đăng ký bản quyền
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
                Phạm Thanh Cảnh
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faCalendarPlus}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Ngày đăng: 10/2/2025
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faTags}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Lĩnh vực: <span className="ml-1 font-bold">Công nghệ</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="px-6 py-3">
          <h3 className="font-medium text-sm pb-2">Tóm tắt ý tưởng</h3>
          <p className="font-medium text-sm mb-4">
            Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động
            hóa quy trình quản lý doanh nghiệp, bao gồm:....
          </p>
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#75757578]/[47%]">
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#0A2273] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center">
              <FontAwesomeIcon icon={faBook} className="mr-2"></FontAwesomeIcon>
              Đọc tiếp
            </button>
          </div>
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#757575] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center ">
     
             Xóa
            </button>
          </div>
        </div>
      </div>
      <div className=" border border-[#75757578]/[47%] rounded-xl mb-3">
        <div className="py-3 bg-[#adc6ee] px-6 rounded-tl-xl rounded-tr-xl border border-tl-[#adc6ee] border-tr-[#adc6ee]">
          <div className="flex items-center justify-between">
            <h4 className="text-[#0A2273] font-semibold text-base">
              Nền tảng AI hỗ trợ quản lý doanh nghiệp
            </h4>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faTags}
                className="w-5 h-5 mr-3 text-[#FBF30F]  group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <h4 className="text-sm font-bold text-[#FBF30F]">
                Tìm nhà đầu tư
              </h4>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCheckDouble}
                className="w-5 h-5 mr-3 text-teal-500 group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <p className="text-xs font-normal text-[#0A2273]">
                Đã đăng ký bản quyền
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
                Phạm Thanh Cảnh
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faCalendarPlus}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Ngày đăng: 10/2/2025
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faTags}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Lĩnh vực: <span className="ml-1 font-bold">Công nghệ</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="px-6 py-3">
          <h3 className="font-medium text-sm pb-2">Tóm tắt ý tưởng</h3>
          <p className="font-medium text-sm mb-4">
            Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động
            hóa quy trình quản lý doanh nghiệp, bao gồm:....
          </p>
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#75757578]/[47%]">
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#0A2273] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center">
              <FontAwesomeIcon icon={faBook} className="mr-2"></FontAwesomeIcon>
              Đọc tiếp
            </button>
          </div>
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#757575] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center ">
     
             Xóa
            </button>
          </div>
        </div>
      </div>
      <div className=" border border-[#75757578]/[47%] rounded-xl mb-3">
        <div className="py-3 bg-[#adc6ee] px-6 rounded-tl-xl rounded-tr-xl border border-tl-[#adc6ee] border-tr-[#adc6ee]">
          <div className="flex items-center justify-between">
            <h4 className="text-[#0A2273] font-semibold text-base">
              Nền tảng AI hỗ trợ quản lý doanh nghiệp
            </h4>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faTags}
                className="w-5 h-5 mr-3 text-[#FBF30F]  group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <h4 className="text-sm font-bold text-[#FBF30F]">
                Tìm nhà đầu tư
              </h4>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCheckDouble}
                className="w-5 h-5 mr-3 text-teal-500 group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <p className="text-xs font-normal text-[#0A2273]">
                Đã đăng ký bản quyền
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
                Phạm Thanh Cảnh
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faCalendarPlus}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Ngày đăng: 10/2/2025
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faTags}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Lĩnh vực: <span className="ml-1 font-bold">Công nghệ</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="px-6 py-3">
          <h3 className="font-medium text-sm pb-2">Tóm tắt ý tưởng</h3>
          <p className="font-medium text-sm mb-4">
            Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động
            hóa quy trình quản lý doanh nghiệp, bao gồm:....
          </p>
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#75757578]/[47%]">
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#0A2273] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center">
              <FontAwesomeIcon icon={faBook} className="mr-2"></FontAwesomeIcon>
              Đọc tiếp
            </button>
          </div>
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#757575] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center ">
     
             Xóa
            </button>
          </div>
        </div>
      </div>
      <div className=" border border-[#75757578]/[47%] rounded-xl mb-3">
        <div className="py-3 bg-[#adc6ee] px-6 rounded-tl-xl rounded-tr-xl border border-tl-[#adc6ee] border-tr-[#adc6ee]">
          <div className="flex items-center justify-between">
            <h4 className="text-[#0A2273] font-semibold text-base">
              Nền tảng AI hỗ trợ quản lý doanh nghiệp
            </h4>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faTags}
                className="w-5 h-5 mr-3 text-[#FBF30F]  group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <h4 className="text-sm font-bold text-[#FBF30F]">
                Tìm nhà đầu tư
              </h4>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCheckDouble}
                className="w-5 h-5 mr-3 text-teal-500 group-hover:opacity-70 group-hover:transition-all "
              ></FontAwesomeIcon>
              <p className="text-xs font-normal text-[#0A2273]">
                Đã đăng ký bản quyền
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
                Phạm Thanh Cảnh
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faCalendarPlus}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Ngày đăng: 10/2/2025
              </h3>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-[#0A2273]"
                icon={faTags}
              ></FontAwesomeIcon>
              <h3 className="ml-5 text-sm text-[#0A2273] font-normal">
                Lĩnh vực: <span className="ml-1 font-bold">Công nghệ</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="px-6 py-3">
          <h3 className="font-medium text-sm pb-2">Tóm tắt ý tưởng</h3>
          <p className="font-medium text-sm mb-4">
            Chúng tôi phát triển một nền tảng AI tích hợp các công cụ tự động
            hóa quy trình quản lý doanh nghiệp, bao gồm:....
          </p>
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#75757578]/[47%]">
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#0A2273] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center">
              <FontAwesomeIcon icon={faBook} className="mr-2"></FontAwesomeIcon>
              Đọc tiếp
            </button>
          </div>
          <div className="p-2 min-w-[120px] max-w-[120px] bg-[#757575] rounded-lg text-white flex items-center justify-center hover:opacity-70 hover:transition-all cursor-pointer">
            <button className="flex items-center justify-center ">
     
             Xóa
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-white py-6">
        <Pagination
          // count={totalPages}
          count={50}
         variant="outlined" color="secondary"
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
  );
} 