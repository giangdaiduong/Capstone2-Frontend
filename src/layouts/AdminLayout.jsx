import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout; 