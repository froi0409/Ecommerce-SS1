import React, { useState } from "react";
import { Grid,TextField,Box } from '@mui/material'
import Product from "./Product/Product";
import { useStyles } from "./styles";

const productosTraidos = [
    {id: 1, nombre: 'Computadora', descripcion: 'Laptop nueva del mercado', precio: '100', imagen: 'https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/w_1920,c_limit/How-to-Choose-a-Laptop-August-2023-Gear.jpg', stock: '15'},
    {id: 2, nombre: 'Laptop vieja', descripcion: 'Laptop vieja del mercado', precio: '50', imagen: 'https://www.asus.com/media/Odin/Websites/global/ProductLine/20201014051549/P_setting_xxx_0_90_end_185.png?webp', stock: '10'},
]

const Products = ({addToCart,getQuantityInCart}) => {    
    const classes = useStyles();
    const [filtro, setFiltro] = useState('');
    const [productos, setProductos] = useState(productosTraidos);

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
    };
  
    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(filtro.toLowerCase())
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
                    <Grid item key={producto.id} xs={12} sm={6} lg={3}>
                        <Product producto={producto} addToCart={addToCart} getQuantityInCart={getQuantityInCart}></Product>
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default Products;