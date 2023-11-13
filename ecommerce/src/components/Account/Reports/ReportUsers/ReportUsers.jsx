import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useStyles } from './style';

const ReportUsers = () => {
    const classes = useStyles()
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/getAllUsers`);
                const data = response.data;

                // Agrega un id único a cada fila usando el campo `username` y formatea la fecha
                const dataWithIdsAndFormattedDate = data.map((row) => ({
                    ...row,
                    id: row.username,
                    birth_date: formatDate(row.birth_date),
                }));

                // Actualiza el estado con los datos que incluyen el id y la fecha formateada
                setUsersData(dataWithIdsAndFormattedDate);

            } catch (error) {
                console.error('Error fetching users data:', error);
            }
        };

        fetchUsersData();
    }, []); // La dependencia vacía asegura que se realice solo una vez al montar el componente

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
      };

    const columns = [
        { field: 'username', headerName: 'Usuario', width: 190 },
        { field: 'first_name', headerName: 'Nombre', width: 190 },
        { field: 'last_name', headerName: 'Apellido', width: 190 },
        { field: 'birth_date', headerName: 'Fecha de Nacimiento', width: 250 },
        { field: 'user_type', headerName: 'Tipo de Usuario', width: 150 },
    ];

    return (
        <div className={classes.content} style={{ height: 400, width: '100%' }}>
            <Paper elevation={3} style={{ padding: '1rem' }}>
                <Typography variant="h4" gutterBottom>
                    Reporte de Usuarios
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={usersData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </div>
            </Paper>
        </div>
    );
};

export default ReportUsers;
