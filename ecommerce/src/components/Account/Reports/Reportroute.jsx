import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import Reports from './Reports';
import ReportUsers from './ReportUsers/ReportUsers';
import DeniedAuth from '../../DeniedAuth/DeniedAuth';
import { useAuth } from '../../../context/AuthContext';
import isAuthenticated from '../../../config/auth';
import axios from 'axios';
import ReportEmployer from './ReportEmployer/ReportEmployer';
import ReportSales from './ReportSales/ReportSales';
import ReportProductsCategory from './ReportProductsCategory/ReportProductsCategory';
import ReportsaleFail from './ReportsaleFail/ReportsaleFail';
import ReportProductsSuppliers from './ReportProductsSuppliers/ReportProductsSuppliers';
import ReportProductosMoreSales from './ReportProductosMoreSales/ReportProductosMoreSales';
import ReportProductsName from './ReportProductsName/ReportProductsName';
import ReportProductsIntervalTime from './ReportProductsIntervalTime/ReportProductsIntervalTime';

const  Reportroute = () => {
    const {userData} = useAuth();
    if (!isAuthenticated()) {
        return <DeniedAuth />
    }

    const getReport = async (url) => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/${url}`);
                const data = response.data;
                return data
            } catch (error) {
                console.error('Error fetching users data:', error);
                return {}
            }
    };


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    return (
        <div>
            <Routes >
                <Route path="/" element={<Reports />} />
                <Route path="/report-users" element={<ReportUsers getReport={getReport} formatDate={formatDate} />} />
                <Route path="/report-employer" element={<ReportEmployer getReport={getReport} formatDate={formatDate} />} />
                <Route path="/report-sales" element={<ReportSales getReport={getReport} formatDate={formatDate} />} />
                <Route path="/report-products-category" element={<ReportProductsCategory getReport={getReport} formatDate={formatDate} />} />
                <Route path="/report-products-suppliers" element={<ReportProductsSuppliers getReport={getReport} formatDate={formatDate} />} />
                <Route path="/report-productos-more-sales" element={<ReportProductosMoreSales getReport={getReport} formatDate={formatDate} />} />
                <Route path="/report-products-name" element={<ReportProductsName getReport={getReport} formatDate={formatDate} />} />
                <Route path="/report-products-interval-time" element={<ReportProductsIntervalTime getReport={getReport} formatDate={formatDate} />} />
                <Route path="/report-sale-fail" element={<ReportsaleFail getReport={getReport} formatDate={formatDate} />} />
            </Routes>
        </div>
    );
}

export default  Reportroute;
