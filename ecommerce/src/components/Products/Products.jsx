import React, { useState,useEffect } from "react";
import { Grid,TextField,Box } from '@mui/material'
import Product from "./Product/Product";
import { useStyles } from "./styles";
import axios from 'axios';

const Products = ({addToCart,getQuantityInCart}) => {    
    const classes = useStyles();
    const [filtro, setFiltro] = useState('');


    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/getAllProducts');
            setProductos(response.data);
          } catch (error) {
            console.error('Error al obtener datos de la API', error);
          }
        };
    
        fetchData();
      }, []);

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
    };
  
    const productosFiltrados = productos.filter((producto) =>
        producto.product_name.toLowerCase().includes(filtro.toLowerCase())
    );
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Box m={2}>
                <TextField
                    label="Filtrar por título"
                    variant="outlined"
                    fullWidth
                    value={filtro}
                    onChange={handleFiltroChange}
                />
                
            </Box>
            
            <Grid container justify="center" spacing={4}>
                {productosFiltrados.map((producto) => (
                    <Grid item key={producto.product_id} xs={12} sm={6} lg={3}>
                        <Product producto={producto} addToCart={addToCart} getQuantityInCart={getQuantityInCart}></Product>
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default Products;