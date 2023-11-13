import React, { useState, useEffect } from 'react';
import ReportStructure from '../ReportStructure/ReportStructure';
import { Button, Container, FormControl, InputLabel, TextField } from '@mui/material';

const ReportProductsIntervalTime = (props) => {
    const [usersData, setUsersData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const title = 'Productos por Intervalo de tiempo'

    const columns = [
        { field: 'product_id', headerName: 'ID', width: 190 },
        { field: 'product_name', headerName: 'Nombre', width: 190 },
        { field: 'supplier_name', headerName: 'Proveedor', width: 190 },
        { field: 'unit_price', headerName: 'precio unitario', width: 250 },
        { field: 'stock', headerName: 'Stock', width: 250 },
        { field: 'date', headerName: 'Fecha', width: 250 },
    ];

    const handleStartDateChange = (date) => {
        if (!isNaN(date.getTime())) {
            setStartDate(date);
        }
    };

    const handleEndDateChange = (date) => {
        if (!isNaN(date.getTime())) {
            setEndDate(date);
        }
    };

    const handleRequest = async () => {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        console.log(`productsUntilADate/${formattedStartDate}/${formattedEndDate}`)
        const data = await props.getReport(`productsUntilADate/${formattedStartDate}/${formattedEndDate}`);
        if (Array.isArray(data)) {
            const dataWithIdsAndFormattedDate = data.map((row) => ({
                ...row,
                id: row.product_id,
                date: props.formatDate(row.date),
            }));
            setUsersData(dataWithIdsAndFormattedDate);
        }
    };

    return (
        <Container sx={{ padding: 10 }} >
            <FormControl fullWidth margin="dense">
                <InputLabel>Fecha de inicio</InputLabel>
                <br />
                <TextField
                    type="date"
                    value={startDate.toISOString().split('T')[0]}
                    onChange={(e) => handleStartDateChange(new Date(e.target.value))}
                />
            </FormControl>
            <FormControl fullWidth margin="dense">
                <InputLabel>Fecha de fin</InputLabel>
                <br />
                <TextField
                    type="date"
                    value={endDate.toISOString().split('T')[0]}
                    onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                />
            </FormControl>
            <Button variant="contained" onClick={handleRequest}>
                Realizar petición
            </Button>
            <ReportStructure title={title} columns={columns} usersData={usersData} />
        </Container>
    );
};

export default ReportProductsIntervalTime;

