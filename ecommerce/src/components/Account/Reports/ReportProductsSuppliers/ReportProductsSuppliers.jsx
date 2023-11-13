import React, { useState, useEffect } from 'react';
import ReportStructure from '../ReportStructure/ReportStructure';
// import { useStyles } from '../../styles';
import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ReportProductsSuppliers = (props) => {
    // const classes = useStyles()
    const [usersData, setUsersData] = useState([]);
    const [supplier, setSupplier] = useState('Pop!')
    const [suppliers, setSuppliers] = useState([]);
    const title = 'Productos por proveedor'

    useEffect(() => {
        const fetchData = async () => {
            console.log('request')
            const categories = await props.getReport('getAllSuppliers');
            setSuppliers(categories);
            const data = await props.getReport('soldProductsBySupplier/' +  supplier);
            // Agrega un id único a cada fila usando el campo `username` y formatea la fecha
            const dataWithIdsAndFormattedDate = data.map((row) => ({
                ...row,
                id: row.product_id,
            }));
    
            // Actualiza el estado con los datos que incluyen el id y la fecha formateada
            setUsersData(dataWithIdsAndFormattedDate);
        }
        fetchData()
    }, [ supplier]); // La dependencia vacía asegura que se realice solo una vez al montar el componente

    const columns = [
        { field: 'product_id', headerName: 'id', width: 190 },
        { field: 'product_name', headerName: 'Nombre', width: 190 },
        { field: 'category_name', headerName: 'Categoria', width: 190 },
        { field: 'supplier_name', headerName: 'Nombre del proveedor', width: 250 },
        { field: 'total_sold', headerName: 'Cantidad', width: 250 },
        { field: 'total_sales', headerName: 'Total de ventas', width: 250 },
    ];

    const handleChangeCategory = (e) => {
        // Actualiza la lista de archivos seleccionados
        const categoriaSeleccionada = e.target.value;
        setSupplier(categoriaSeleccionada);
      };

    return (
        <Container sx={{ padding: 10 }} >
            <FormControl fullWidth margin="dense">
            <InputLabel>Selecciona el proveedor</InputLabel>
            <Select
              value={ supplier} 
              onChange={handleChangeCategory}
            >
              {suppliers.map(( supplier) => (
                <MenuItem key={ supplier.supplier_id} value={ supplier.supplier_name}>
                  { supplier.supplier_name}
                </MenuItem>
              ))}
            </Select> 
            </FormControl>
            <ReportStructure title={title} columns={columns} usersData={usersData} />
        </Container>
    );
};

export default ReportProductsSuppliers;

