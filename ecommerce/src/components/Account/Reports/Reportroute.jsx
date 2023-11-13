import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import Reports from './Reports';
import ReportUsers from './ReportUsers/ReportUsers';
import DeniedAuth from '../../DeniedAuth/DeniedAuth';
import { useAuth } from '../../../context/AuthContext';
import isAuthenticated from '../../../config/auth';

const  Reportroute = () => {
    const {userData} = useAuth();
    if (!isAuthenticated()) {
        return <DeniedAuth />
    }
    return (
        <div>
            <Routes >
                <Route path="/" element={<Reports />} />
                <Route path="/report-users" element={<ReportUsers />} />
            </Routes>
        </div>
    );
}

export default  Reportroute;
