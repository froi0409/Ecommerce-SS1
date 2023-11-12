import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import Account from './Account';
import Orders from './Orders/Orders';
import DeniedAuth from '../DeniedAuth/DeniedAuth';
import isAuthenticated from '../../config/auth';
import AccountCrud from './AccountCrud/AccountCrud';

const Accountroute = () => {
    if (!isAuthenticated()) {
        return <DeniedAuth />
    }
    return (
        <div>
            <Routes >
                <Route path="/" element={<Account />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/crud-menu" element={<AccountCrud />} />
            </Routes>
        </div>
    );
}

export default Accountroute;
