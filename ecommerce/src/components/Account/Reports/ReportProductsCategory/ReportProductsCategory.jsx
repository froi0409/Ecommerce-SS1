import React, { useState, useEffect } from 'react';
import ReportStructure from '../ReportStructure/ReportStructure';
// import { useStyles } from '../../styles';
import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ReportProductsCategory = (props) => {
    // const classes = useStyles()
    const [usersData, setUsersData] = useState([]);
    const [category, setCategory] = useState('Todos')
    const [categories, setCategories] = useState([]);
    const title = 'Productos por categoria'

    useEffect(() => {
        const fetchData = async () => {
            console.log('request')
            const categories = await props.getReport('getAllCategories');
            setCategories(categories);
            const data = await props.getReport('soldProductsByCategory/' + category);
            // Agrega un id único a cada fila usando el campo `username` y formatea la fecha
            const dataWithIdsAndFormattedDate = data.map((row) => ({
                ...row,
                id: row.category_name,
            }));
    
            // Actualiza el estado con los datos que incluyen el id y la fecha formateada
            setUsersData(dataWithIdsAndFormattedDate);
        }
        fetchData()
    }, [category]); // La dependencia vacía asegura que se realice solo una vez al montar el componente

    const columns = [
        { field: 'category_name', headerName: 'Nombre de la categoria', width: 190 },
        { field: 'product_name', headerName: 'Nombre', width: 190 },
        { field: 'total_sold', headerName: 'Cantidad vendida', width: 190 },
        { field: 'total_sales', headerName: 'Total de ventas', width: 250 },
    ];

    const handleChangeCategory = (e) => {
        // Actualiza la lista de archivos seleccionados
        const categoriaSeleccionada = e.target.value;
        setCategory(categoriaSeleccionada);
      };

    return (
        <Container sx={{ padding: 10 }} >
            <FormControl fullWidth margin="dense">
            <InputLabel>Selecciona la categoria</InputLabel>
            <Select
              value={category} 
              onChange={handleChangeCategory}
            >
              {categories.map((category) => (
                <MenuItem key={category.category_name} value={category.category_name}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select> 
            </FormControl>
            <ReportStructure title={title} columns={columns} usersData={usersData} />
        </Container>
    );
};

export default ReportProductsCategory;

