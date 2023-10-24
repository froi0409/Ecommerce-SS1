import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import Account from './Account';
import Orders from './Orders/Orders';

const Accountroute = () => {
    return (
        <div>
            <Routes >
                <Route path="/" element={<Account />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </div>
    );
}

export default Accountroute;
