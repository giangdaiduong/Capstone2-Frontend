import React from 'react';

import AccountPage from '../Components/AccountManagement/UserInformation.jsx';
const UserInformationPage = () => {
    return (
        <div className="flex ">

            <div className="flex-1 flex flex-col">
              
                <AccountPage/>
            </div>
        </div>
    );
};

export default UserInformationPage ;
