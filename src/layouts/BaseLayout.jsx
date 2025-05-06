import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const BaseLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow">
        <Outlet /> {/* ✅ từng trang sẽ tự có Header riêng */}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
