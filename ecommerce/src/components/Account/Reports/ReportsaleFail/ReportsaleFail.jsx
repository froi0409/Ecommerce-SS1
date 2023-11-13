import React, { useState, useEffect } from 'react';
import ReportStructure from '../ReportStructure/ReportStructure';

const ReportsaleFail = (props) => {
    const [usersData, setUsersData] = useState([]);
    const title = 'Ventas fallidas'

    useEffect(() => {
        const fetchData = async () => {
            const data = await props.getReport('unsuccessfulSales');
            // Agrega un id único a cada fila usando el campo `username` y formatea la fecha
            const dataWithIdsAndFormattedDate = data.map((row) => ({
                ...row,
                id: row.sale_id,
                sale_date: props.formatDate(row.sale_date),
            }));
    
            // Actualiza el estado con los datos que incluyen el id y la fecha formateada
            setUsersData(dataWithIdsAndFormattedDate);
        }
        fetchData()
    }, []); // La dependencia vacía asegura que se realice solo una vez al montar el componente

    const columns = [
        { field: 'sale_id', headerName: 'Id', width: 190 },
        { field: 'sale_date', headerName: 'Fecha', width: 190 },
        { field: 'sale_hour', headerName: 'Hora', width: 190 },
        { field: 'user_username', headerName: 'usuario', width: 250 },
        { field: 'sale_message', headerName: 'Mensaje', width: 250 },
        { field: 'product_detail', headerName: 'Detalles de la venta', width: 400 },
    ];

    return (
        <ReportStructure title={title} columns={columns} usersData={usersData} />
    );
};

export default ReportsaleFail;

