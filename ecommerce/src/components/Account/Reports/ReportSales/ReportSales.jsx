import React, { useState, useEffect } from 'react';
import ReportStructure from '../ReportStructure/ReportStructure';

const ReportSales = (props) => {
    const [usersData, setUsersData] = useState([]);

    const [totalSales, setTotalSales] = useState(null);
    const [salesList, setSalesList] = useState([]);


    const title = 'Ventas generales'

    useEffect(() => {
        const fetchData = async () => {
            const data = await props.getReport('overallSales');

            // Extrae el total_sales y salesList del resultado de la solicitud
            const { overallSales, salesList } = data;

            // Actualiza el estado con el total_sales
            setTotalSales(overallSales[0]?.total_sales || null);

            // Agrega un id único a cada fila en salesList usando el campo `sale_id` y formatea la fecha
            const salesListWithIdsAndFormattedDate = salesList.map((row) => ({
                ...row,
                id: row.sale_id,
                sale_date: props.formatDate(row.sale_date),
            }));

            // Actualiza el estado con los datos detallados de salesList
            setSalesList(salesListWithIdsAndFormattedDate);
        }
        fetchData()
    }, []); // La dependencia vacía asegura que se realice solo una vez al montar el componente

    const columns = [
        { field: 'sale_id', headerName: 'Id', width: 190 },
        { field: 'sale_date', headerName: 'Fecha', width: 190 },
        { field: 'sale_hour', headerName: 'Hora', width: 190 },
        { field: 'user_name', headerName: 'User', width: 250 },
        { field: 'total_sale', headerName: 'Total de ventas', width: 250 },
    ];

    const sales_ammount = `Total de ventas: ${totalSales}`

    return (
        <div>
            {/* Muestra la información detallada de cada venta usando el componente ReportStructure */}
            <ReportStructure title={title} columns={columns} usersData={salesList} joker_field={sales_ammount} />
        </div>
    );
};

export default ReportSales;

