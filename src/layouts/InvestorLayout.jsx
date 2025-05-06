import React from 'react';
import { Outlet } from 'react-router-dom';
import InvestorSidebar from '../components/investor/InvestorSidebar';
import HeaderInvestor from '../components/HeaderInvestor';


const InvestorLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <HeaderInvestor />
            <div className="flex min-h-screen">
                <InvestorSidebar />
                <div className="flex-1 p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default InvestorLayout; 