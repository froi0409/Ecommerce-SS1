import React, { useState, useEffect } from 'react';
import ReportStructure from '../ReportStructure/ReportStructure';
import { Container, FormControl, InputLabel, TextField } from '@mui/material';

const ReportProductsName = (props) => {
    const [usersData, setUsersData] = useState([]);
    const [name, setName] = useState('')
    const title = 'Productos por Nombre'

    useEffect(() => {
        const fetchData = async () => {
            console.log('request');
            const data = await props.getReport('soldProductsByName/' + name);
            if (Array.isArray(data)) {
                // Agrega un id único a cada fila usando el campo `username` y formatea la fecha
                const dataWithIdsAndFormattedDate = data.map((row) => ({
                    ...row,
                    id: row.product_id,
                }));
                // Actualiza el estado con los datos que incluyen el id y la fecha formateada
                setUsersData(dataWithIdsAndFormattedDate);
            }
        }
        fetchData()
    }, [name]); // La dependencia vacía asegura que se realice solo una vez al montar el componente

    const columns = [
        { field: 'product_id', headerName: 'ID', width: 190 },
        { field: 'product_name', headerName: 'Nombre', width: 190 },
        { field: 'category_name', headerName: 'categoria', width: 190 },
        { field: 'total_sold', headerName: 'Cantidad', width: 250 },
        { field: 'total_sales', headerName: 'Total de ventas', width: 250 },
    ];

    const handleChange = (e) => {
        // Actualiza la lista de archivos seleccionados
        const categoriaSeleccionada = e.target.value;
        setName(categoriaSeleccionada);
      };

    return (
        <Container sx={{ padding: 10 }} >
            <FormControl fullWidth margin="dense">
            <TextField placeholder='Escribe el nombre' value={name} onChange={handleChange} name='name' />
            </FormControl>
            <ReportStructure title={title} columns={columns} usersData={usersData} />
        </Container>
    );
};

export default ReportProductsName;

