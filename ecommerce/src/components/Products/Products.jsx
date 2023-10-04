import React from "react";
import { Grid } from '@mui/material'
import Product from "./Product/Product";
import useStyles from './styles';

const productos = [
    {id: 1, nombre: 'Computadora', descripcion: 'Laptop nueva del mercado', precio: '100', imagen: 'https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/w_1920,c_limit/How-to-Choose-a-Laptop-August-2023-Gear.jpg'},
    {id: 2, nombre: 'Laptop vieja', descripcion: 'Laptop vieja del mercado', precio: '50', imagen: 'https://www.asus.com/media/Odin/Websites/global/ProductLine/20201014051549/P_setting_xxx_0_90_end_185.png?webp'},
]



const Products = () => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <Grid container justify="center" spacing={4}>
                {productos.map((producto) => (
                    <Grid item key={producto.id} xs={12} sm={6} lg={3}>
                        <Product producto={producto}></Product>
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default Products;