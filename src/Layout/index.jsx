import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        {/* <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"> */}
        <Outlet />
        {/* </div> */}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
