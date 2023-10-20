
import React, { useState, useEffect } from "react";
import { Grid,TextField,Box } from '@mui/material'
import Product from "./Product/Product";
import { useStyles } from "./styles";
import axios from 'axios';
import Categories from "./Categories/Categories";


const Products = ({ addToCart, getQuantityInCart }) => {
    const classes = useStyles();
    const [filtro, setFiltro] = useState('');


    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/getAllProducts');
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
            <Grid container spacing={1}>
                {/* Primera columna */}
                <Grid item xs={12} sm={2}>
                    <Categories />
                </Grid>

                {/* Segunda columna */}
                <Grid item xs={12} sm={10}>
                    <Box m={2}>
                        <TextField
                            sx= {{background: "#CFE2FF"}}
                            label="Filtrar por título"
                            variant="outlined"
                            fullWidth
                            value={filtro}
                            onChange={handleFiltroChange}
                        />
                    </Box>
                    <Grid container spacing={4}>
                        {productosFiltrados.map((producto) => (
                            <Grid item key={producto.product_id} xs={12} sm={6} lg={3}>
                                <Product
                                    producto={producto}
                                    addToCart={addToCart}
                                    getQuantityInCart={getQuantityInCart}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

        </main>
    );
}

export default Products;