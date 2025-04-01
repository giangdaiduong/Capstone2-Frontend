import axiosInstance from '../utils/httpRequest';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/Auth', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during login' };
    }
  },
}; 