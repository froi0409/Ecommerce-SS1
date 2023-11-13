import React, { useState, useEffect } from 'react';
import { Typography, Paper} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useStyles } from './style';

const ReportUsers = (props) => {
    const classes = useStyles()
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await props.getReport('getAllUsers');
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
                        // checkboxSelection
                    />
                </div>
            </Paper>
        </div>
    );
};

export default ReportUsers;
