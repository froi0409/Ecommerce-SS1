import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import Account from './Account';
import Orders from './Orders/Orders';
import DeniedAuth from '../DeniedAuth/DeniedAuth';
import isAuthenticated from '../../config/auth';
import AccountCrud from './AccountCrud/AccountCrud';
import { useAuth } from '../../context/AuthContext';
import AccountSecurity from './AccountSecurity/AccountSecurity';
import Reportroute from './Reports/Reportroute';

const Accountroute = () => {
    const {userData} = useAuth();
    if (!isAuthenticated()) {
        return <DeniedAuth />
    }
    const isClient = userData.type === 'CLIENTE';
    return (
        <div>
            <Routes >
                <Route path="/" element={<Account />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/security" element={<AccountSecurity />} />
                <Route path="/reports/*" element={<Reportroute />} />
                {!isClient && <Route path="/crud-menu" element={<AccountCrud />} />}                
            </Routes>
        </div>
    );
}

export default Accountroute;
