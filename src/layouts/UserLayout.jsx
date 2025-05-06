import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
