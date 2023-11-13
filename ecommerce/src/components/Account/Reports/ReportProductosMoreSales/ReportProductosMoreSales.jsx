import React, { useState, useEffect } from 'react';
import ReportStructure from '../ReportStructure/ReportStructure';

const ReportProductosMoreSales = (props) => {
    const [usersData, setUsersData] = useState([]);

    const [totalSales, setTotalSales] = useState(null);
    const [productsList, setSalesList] = useState([]);


    const title = 'Productos con mayor ventas'

    useEffect(() => {
        const fetchData = async () => {
            const data = await props.getReport('salesAboveAverage');

            // Extrae el total_sales y productsList del resultado de la solicitud
            const { average, productsList } = data;

            // Actualiza el estado con el total_sales
            setTotalSales(average[0]?.average_sales || null);

            // Agrega un id único a cada fila en productsList usando el campo `sale_id` y formatea la fecha
            const productsListWithIdsAndFormattedDate = productsList.map((row) => ({
                ...row,
                id: row.product_id,
            }));

            // Actualiza el estado con los datos detallados de productsList
            setSalesList(productsListWithIdsAndFormattedDate);
        }
        fetchData()
    }, []); // La dependencia vacía asegura que se realice solo una vez al montar el componente

    const columns = [
        { field: 'product_id', headerName: 'Id', width: 190 },
        { field: 'product_name', headerName: 'Nombre', width: 190 },
        { field: 'category_name', headerName: 'Categoria', width: 190 },
        { field: 'supplier_name', headerName: 'proveedor', width: 250 },
        { field: 'total_sold', headerName: 'Total vendidos', width: 250 },
        { field: 'total_sales', headerName: 'Total de ventas', width: 250 },
    ];

    const sales_ammount = `Promedio de ventas: ${totalSales}`

    return (
        <div>
            {/* Muestra la información detallada de cada venta usando el componente ReportStructure */}
            <ReportStructure title={title} columns={columns} usersData={productsList} joker_field={sales_ammount} />
        </div>
    );
};

export default ReportProductosMoreSales;

