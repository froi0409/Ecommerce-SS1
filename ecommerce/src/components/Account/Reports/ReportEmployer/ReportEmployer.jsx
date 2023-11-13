import React, { useState, useEffect } from 'react';
import ReportStructure from '../ReportStructure/ReportStructure';

const ReportEmployer = (props) => {
    const [usersData, setUsersData] = useState([]);
    const title = 'Todos los empleados'

    useEffect(() => {
        const fetchData = async () => {
            const data = await props.getReport('getEmployees');
            // Agrega un id único a cada fila usando el campo `username` y formatea la fecha
            const dataWithIdsAndFormattedDate = data.map((row) => ({
                ...row,
                id: row.username,
                birth_date: props.formatDate(row.birth_date),
            }));
    
            // Actualiza el estado con los datos que incluyen el id y la fecha formateada
            setUsersData(dataWithIdsAndFormattedDate);
        }
        fetchData()
    }, []); // La dependencia vacía asegura que se realice solo una vez al montar el componente

    const columns = [
        { field: 'username', headerName: 'Usuario', width: 190 },
        { field: 'first_name', headerName: 'Nombre', width: 190 },
        { field: 'last_name', headerName: 'Apellido', width: 190 },
        { field: 'birth_date', headerName: 'Fecha de Nacimiento', width: 250 },
    ];

    return (
        <ReportStructure title={title} columns={columns} usersData={usersData} />
    );
};

export default ReportEmployer;

