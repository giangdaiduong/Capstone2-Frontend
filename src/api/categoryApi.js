import axiosInstance from "../utils/httpRequest";

// Lấy tất cả user (có phân trang/filter)
export const getCategories = (params) => axiosInstance.get('/client/category', { params });

export const getCategory = (params) => axiosInstance.get('/client/category', { params });


