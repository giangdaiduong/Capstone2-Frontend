import React from 'react';
import HeaderIdea from '../components/HeaderIdea'; 
import { useNavigate } from 'react-router-dom';

const fakeHomeData = {
  userName: 'Nguyễn Văn A',
  date: new Date().toLocaleDateString('vi-VN'),
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <HeaderIdea />
     <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold text-blue-600">Trang Chủ</h2>

      <div className="mt-4">
        <p className="text-gray-700">Chào mừng {fakeHomeData.userName}!</p>
        <p className="text-gray-500">Hôm nay là {fakeHomeData.date}</p>
      </div>
    </div>
    </>
  );
};

export default Home;
