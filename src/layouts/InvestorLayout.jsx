import React from 'react';
import { Outlet } from 'react-router-dom';
import InvestorSidebar from '../components/investor/InvestorSidebar';

const InvestorLayout = () => {
    return (
        <div className="flex min-h-screen">
            <InvestorSidebar />
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default InvestorLayout; 