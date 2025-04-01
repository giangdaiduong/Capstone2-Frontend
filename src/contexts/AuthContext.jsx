import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/httpRequest';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole) {
      setUser({ role: userRole });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/Auth', { email, password });
      const { token, role } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      
      setUser({ role });

      // Redirect based on role
      switch (role) {
        case 'admin':
          return '/admin/dashboard';
        case 'investor':
          return '/investor/dashboard';
        default:
          return '/user/dashboard';
      }
    } catch (error) {
      throw error.response?.data || { message: 'Đăng nhập thất bại' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
    window.location.href = '/login';
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 