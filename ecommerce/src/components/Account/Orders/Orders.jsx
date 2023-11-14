import React, { useEffect, useState } from 'react';
import ReportStructure from '../Reports/ReportStructure/ReportStructure';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const Orders = () => {
  const {userData } = useAuth();
  const [usersData, setUsersData] = useState([]);
  const title = 'Mis ordenes'
  const columns = [
    { field: 'sale_id', headerName: 'Id', width: 190 },
    { field: 'sale_date', headerName: 'Fecha', width: 250 },
    { field: 'sale_hour', headerName: 'Hora', width: 190 },
    { field: 'product_list', headerName: 'Lista de productos', width: 320 },
    { field: 'total_sale', headerName: 'Total de ventas', width: 150 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReport('getPurchasesByUsername/'+ userData.user);
      // Agrega un id único a cada fila usando el campo `username` y formatea la fecha
      const dataWithIdsAndFormattedDate = data.map((row) => ({
        ...row,
        id: row.sale_id,
        sale_date: formatDate(row.sale_date),
      }));

      // Actualiza el estado con los datos que incluyen el id y la fecha formateada
      setUsersData(dataWithIdsAndFormattedDate);
    }
    fetchData()
  }, []); // La dependencia vacía asegura que se realice solo una vez al montar el componente

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
    <ReportStructure title={title} columns={columns} usersData={usersData} />
  );
}

export default Orders;
