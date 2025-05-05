import axiosInstance from "../utils/httpRequest";

// Lấy tất cả user (có phân trang/filter)
export const getIdeasIdeas = (params) => axiosInstance.get('/client/ideads', { params });

export const getIdea = (params) => axiosInstance.get('/client/ideads', { params });

export const getIdeaAuth = (params) => axiosInstance.get('/client/ideads', { params });