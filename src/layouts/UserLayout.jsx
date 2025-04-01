import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/user/UserSidebar';

const UserLayout = () => {
    return (
        <div className="flex min-h-screen">
            <UserSidebar />
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default UserLayout; 