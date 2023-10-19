import React, { useState } from "react";
import { Grid, TextField, Box } from '@mui/material'
import Product from "./Product/Product";
import { useStyles } from "./styles";
import Categories from "./Categories/Categories";

const productosTraidos = [
    { id: 1, nombre: 'Computadora', descripcion: 'Laptop nueva del mercado', precio: '100', imagen: 'https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/w_1920,c_limit/How-to-Choose-a-Laptop-August-2023-Gear.jpg', stock: '15' },
    { id: 2, nombre: 'Laptop vieja', descripcion: 'Laptop vieja del mercado', precio: '50', imagen: 'https://www.asus.com/media/Odin/Websites/global/ProductLine/20201014051549/P_setting_xxx_0_90_end_185.png?webp', stock: '10' },
    { id: 3, nombre: 'Teléfono', descripcion: 'Teléfono nuevo del mercado', precio: '200', imagen: 'https://www.apple.com/v/iphone-15/b/images/overview/contrast/iphone_15pro__ezc4eofw13yq_large.jpg', stock: '25' },
    { id: 4, nombre: 'Televisión', descripcion: 'Televisión nueva del mercado', precio: '300', imagen: 'https://www.samsung.com/us/televisions/frame/2023/the-frame-43-inch-qled-4k-tv/images/the-frame-43-inch-qled-4k-tv-hero.jpg', stock: '30' },
    { id: 5, nombre: 'Nevera', descripcion: 'Nevera nueva del mercado', precio: '400', imagen: 'https://www.lg.com/us/images/refrigerators/gallery/lg-lrf730p1s-gallery.jpg', stock: '35' },
    { id: 6, nombre: 'Lavadora', descripcion: 'Lavadora nueva del mercado', precio: '500', imagen: 'https://www.whirlpool.com/images/home/laundry/washers/front-load/wfw9920fw/wfw9920fw-hero-image.jpg', stock: '40' },
    { id: 7, nombre: 'Secadora', descripcion: 'Secadora nueva del mercado', precio: '600', imagen: 'https://www.lg.com/us/images/dryers/gallery/lg-dlrc6000v-gallery.jpg', stock: '45' },
    { id: 8, nombre: 'Microondas', descripcion: 'Microondas nueva del mercado', precio: '700', imagen: 'https://www.samsung.com/us/microwaves/microwave-ovens/flexwave-multifunction-microwave-oven-2022/images/flexwave-multifunction-microwave-oven-2022-hero.jpg', stock: '50' },
]


const Products = ({ addToCart, getQuantityInCart }) => {
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
                            <Grid item key={producto.id} xs={12} sm={6} lg={3}>
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